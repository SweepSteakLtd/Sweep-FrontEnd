import { useCallback, useMemo, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { useGetLeaderboard } from '~/services/apis/Leaderboard/useGetLeaderboard';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import type { Tournament } from '~/services/apis/schemas';
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
  const { pinnedTeamId, togglePin, isPinned, isUserTeamUnpinned } = usePinnedTeam(leagueId);

  const league = leagueData?.league;

  // Prefer tournament info from league detail response (when present), since it's the most direct
  // association between this league and its tournament. Fall back to matching against the global
  // tournaments list by `id` or `external_id`.
  const tournamentFromLeague = leagueData?.tournament as Tournament | undefined;
  const hasTournamentFromLeague = !!(
    tournamentFromLeague &&
    (tournamentFromLeague.id || tournamentFromLeague.external_id || tournamentFromLeague.name)
  );

  const tournament = hasTournamentFromLeague
    ? tournamentFromLeague
    : tournaments?.find(
        (t) => t.id === league?.tournament_id || t.external_id === league?.tournament_id,
      );

  // Check if tournament has started (entries closed)
  // Tournament has started if it's live or finished (backend provides these flags)
  const tournamentStarted = useMemo(() => {
    if (!tournament) return false;
    const isLive = tournament.is_live ?? false;
    const isFinished = tournament.is_finished ?? false;
    return isLive || isFinished;
  }, [tournament]);

  // Only poll when tournament is live (not when finished)
  const tournamentIsLive = useMemo(() => {
    if (!tournament) return false;
    return tournament.is_live ?? false;
  }, [tournament]);

  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    refetch,
    isRefetching,
  } = useGetLeaderboard(leagueId, {
    refetchInterval: tournamentIsLive ? POLL_INTERVAL : undefined,
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
  const round = leaderboardData?.data?.round;
  const isLoading = isLeaderboardLoading || isLeagueLoading;

  // Sort entries:
  // 1. User's teams that are pinned by default (not explicitly unpinned)
  // 2. Explicitly pinned team (if any, and not a user team)
  // 3. All other teams in their original rank order (including unpinned user teams)
  const sortedEntries = useMemo(() => {
    // User teams that are pinned by default (not explicitly unpinned)
    const defaultPinnedUserTeams = entries.filter((entry) => {
      const entryId = getEntryId(entry);
      return isCurrentUserEntry(entry) && !isUserTeamUnpinned(entryId) && pinnedTeamId !== entryId;
    });

    // Explicitly pinned team (could be user team or other team)
    const explicitlyPinnedTeam = pinnedTeamId
      ? entries.filter((entry) => getEntryId(entry) === pinnedTeamId)
      : [];

    // All other teams (including unpinned user teams) in rank order
    const otherTeams = entries.filter((entry) => {
      const entryId = getEntryId(entry);
      const isUserTeam = isCurrentUserEntry(entry);
      const isExplicitlyPinned = entryId === pinnedTeamId;
      const isDefaultPinned = isUserTeam && !isUserTeamUnpinned(entryId);

      return !isExplicitlyPinned && !isDefaultPinned;
    });

    // Before tournament starts, sort teams alphabetically
    if (!tournamentStarted) {
      const sortedDefaultPinned = [...defaultPinnedUserTeams].sort((a, b) =>
        (a.name.main ?? '').localeCompare(b.name.main ?? ''),
      );
      const sortedOther = [...otherTeams].sort((a, b) =>
        (a.name.main ?? '').localeCompare(b.name.main ?? ''),
      );
      return [...explicitlyPinnedTeam, ...sortedDefaultPinned, ...sortedOther];
    }

    // After tournament starts, keep original rank order for other teams
    return [...explicitlyPinnedTeam, ...defaultPinnedUserTeams, ...otherTeams];
  }, [entries, tournamentStarted, isCurrentUserEntry, pinnedTeamId, isUserTeamUnpinned]);

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

  // Total pot in pence - formatCurrency handles conversion to pounds
  const totalPot = useMemo(() => {
    return (
      leaderboardTotalPot ??
      leagueData?.total_pot ??
      Math.floor((league?.entry_fee ?? 0) * entries.length * 0.9)
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
    round,

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
