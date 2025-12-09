import { useCallback, useMemo, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { useGetLeaderboard } from '~/services/apis/Leaderboard/useGetLeaderboard';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { usePinnedTeam } from '../../hooks/usePinnedTeam';

/** Generate a unique identifier for a leaderboard entry (uses team name + owner, not rank which changes) */
export const getEntryId = (entry: LeaderboardEntry): string =>
  `${entry.name.main}-${entry.name.substring}`;

const POLL_INTERVAL = 5000; // 5 seconds

export const useLeaderboard = (leagueId: string) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch league and tournament data first to determine if polling should be enabled
  const { data: leagueData, isLoading: isLeagueLoading } = useGetLeague(leagueId);
  const { data: tournaments } = useGetTournaments();
  const { data: currentUser } = useGetUser();
  const { pinnedTeamId, togglePin, isPinned } = usePinnedTeam(leagueId);

  const league = leagueData?.league;
  const tournament = tournaments?.find((t) => t.id === league?.tournament_id);

  // Check if tournament has started (entries closed)
  // Use tournament's starts_at to determine if players should be visible
  // Default to false (not started) if no start time is available yet
  const tournamentStarted = useMemo(() => {
    const startTime = tournament?.starts_at;
    if (!startTime) return false; // Default to not started if no time available yet
    return new Date(startTime) <= new Date();
  }, [tournament?.starts_at]);

  // Only poll when tournament has started
  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    refetch,
    isRefetching,
  } = useGetLeaderboard(leagueId, {
    refetchInterval: tournamentStarted ? POLL_INTERVAL : undefined,
  });

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
  // 1. Current user's teams first
  // 2. Pinned team (if any, and not already in user's teams)
  // 3. Other teams (alphabetically before tournament, by rank after)
  const sortedEntries = useMemo(() => {
    const userTeams = entries.filter(isCurrentUserEntry);
    const pinnedTeam = pinnedTeamId
      ? entries.find((entry) => getEntryId(entry) === pinnedTeamId && !isCurrentUserEntry(entry))
      : null;
    const otherTeams = entries.filter(
      (entry) => !isCurrentUserEntry(entry) && getEntryId(entry) !== pinnedTeamId,
    );

    // Before tournament starts, sort other teams alphabetically
    if (!tournamentStarted) {
      const sortedUserTeams = [...userTeams].sort((a, b) =>
        (a.name.main ?? '').localeCompare(b.name.main ?? ''),
      );
      const sortedOtherTeams = [...otherTeams].sort((a, b) =>
        (a.name.main ?? '').localeCompare(b.name.main ?? ''),
      );
      return [...sortedUserTeams, ...(pinnedTeam ? [pinnedTeam] : []), ...sortedOtherTeams];
    }

    // After tournament starts, keep original rank order
    return [...userTeams, ...(pinnedTeam ? [pinnedTeam] : []), ...otherTeams];
  }, [entries, tournamentStarted, isCurrentUserEntry, pinnedTeamId]);

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

    // Pinning
    togglePin,
    isPinned,
  };
};
