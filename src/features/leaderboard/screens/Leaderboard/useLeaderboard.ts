import { useCallback, useMemo, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { useGetLeaderboard } from '~/services/apis/Leaderboard/useGetLeaderboard';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';

const POLL_INTERVAL = 5000; // 5 seconds

export const useLeaderboard = (leagueId: string) => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    refetch,
    isRefetching,
  } = useGetLeaderboard(leagueId, { refetchInterval: POLL_INTERVAL });

  const { data: leagueData, isLoading: isLeagueLoading } = useGetLeague(leagueId);
  const { data: tournaments } = useGetTournaments();
  const { data: currentUser } = useGetUser();

  const league = leagueData?.league;
  const tournament = tournaments?.find((t) => t.id === league?.tournament_id);

  // Check if tournament has started (entries closed)
  // Use tournament's starts_at to determine if players should be visible
  // Default to true (show players) if no start time is available
  const tournamentStarted = useMemo(() => {
    const startTime = tournament?.starts_at;
    if (!startTime) return true; // Default to started if no time available
    return new Date(startTime) <= new Date();
  }, [tournament?.starts_at]);

  // Build current user's full name to match against leaderboard entries
  const currentUserFullName = useMemo(() => {
    if (!currentUser?.first_name || !currentUser?.last_name) return null;
    return `${currentUser.first_name} ${currentUser.last_name}`;
  }, [currentUser?.first_name, currentUser?.last_name]);

  // Helper to check if an entry belongs to current user (by matching full name)
  const isCurrentUserEntry = useCallback(
    (entry: LeaderboardEntry) => {
      if (!currentUserFullName) return false;
      return entry.name.substring.toLowerCase() === currentUserFullName.toLowerCase();
    },
    [currentUserFullName],
  );

  const entries = Array.isArray(leaderboardData?.data?.entries) ? leaderboardData.data.entries : [];
  const leaderboardTotalPot = leaderboardData?.data?.total_pot;
  const isLoading = isLeaderboardLoading || isLeagueLoading;

  // Sort entries:
  // - Before tournament starts: alphabetically by team name
  // - After tournament starts: current user's teams first, then by rank
  const sortedEntries = useMemo(() => {
    if (!tournamentStarted) {
      // Before tournament starts, sort alphabetically by team name
      return [...entries].sort((a, b) => (a.name.main ?? '').localeCompare(b.name.main ?? ''));
    }

    // After tournament starts, show current user's teams first, then by rank
    if (!currentUserFullName) return entries;

    const userTeams = entries.filter(isCurrentUserEntry);
    const otherTeams = entries.filter((entry) => !isCurrentUserEntry(entry));

    return [...userTeams, ...otherTeams];
  }, [entries, tournamentStarted, currentUserFullName, isCurrentUserEntry]);

  const filteredEntries = useMemo(() => {
    if (!searchQuery) return sortedEntries;

    return sortedEntries.filter(
      (entry) =>
        entry.name.main.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.name.substring.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.players.some((p) => p.player_name.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [sortedEntries, searchQuery]);

  const onRefresh = useCallback(async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    await refetch();
  }, [refetch]);

  const currentUserNickname = currentUser?.nickname;

  // Calculate total pot (convert from pence to pounds)
  const totalPot = useMemo(() => {
    return (
      (leaderboardTotalPot ??
        leagueData?.total_pot ??
        Math.floor((league?.entry_fee ?? 0) * entries.length * 0.9)) / 100
    );
  }, [leaderboardTotalPot, leagueData?.total_pot, league?.entry_fee, entries.length]);

  const totalTeams = entries.length || leagueData?.total_team_count || 0;

  return {
    // Data
    league,
    tournament,
    entries,
    filteredEntries,
    totalPot,
    totalTeams,
    currentUserNickname,

    // State
    searchQuery,
    setSearchQuery,
    tournamentStarted,

    // Loading states
    isLoading,
    isRefetching,

    // Helpers
    isCurrentUserEntry,
    onRefresh,
  };
};
