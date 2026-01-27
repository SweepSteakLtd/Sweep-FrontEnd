import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';

const PINNED_TEAMS_KEY = '@sweepsteak:pinned_teams';
const UNPINNED_USER_TEAMS_KEY = '@sweepsteak:unpinned_user_teams';

interface PinnedTeams {
  [leagueId: string]: string; // leagueId -> team identifier (rank-teamName)
}

interface UnpinnedUserTeams {
  [leagueId: string]: string[]; // leagueId -> array of unpinned user team identifiers
}

export const usePinnedTeam = (leagueId: string) => {
  const [pinnedTeamId, setPinnedTeamId] = useState<string | null>(null);
  const [unpinnedUserTeamIds, setUnpinnedUserTeamIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load pinned team and unpinned user teams from storage
  useEffect(() => {
    const loadPinnedTeam = async () => {
      try {
        const [pinnedStored, unpinnedStored] = await Promise.all([
          AsyncStorage.getItem(PINNED_TEAMS_KEY),
          AsyncStorage.getItem(UNPINNED_USER_TEAMS_KEY),
        ]);

        if (pinnedStored) {
          const pinnedTeams: PinnedTeams = JSON.parse(pinnedStored);
          setPinnedTeamId(pinnedTeams[leagueId] || null);
        }

        if (unpinnedStored) {
          const unpinnedTeams: UnpinnedUserTeams = JSON.parse(unpinnedStored);
          setUnpinnedUserTeamIds(unpinnedTeams[leagueId] || []);
        }
      } catch (error) {
        console.error('[PinnedTeam]: Error loading pinned team:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPinnedTeam();
  }, [leagueId]);

  // Pin a team (also remove from unpinned list if it's a user team)
  const pinTeam = useCallback(
    async (teamId: string, isUserTeam: boolean) => {
      try {
        const [pinnedStored, unpinnedStored] = await Promise.all([
          AsyncStorage.getItem(PINNED_TEAMS_KEY),
          AsyncStorage.getItem(UNPINNED_USER_TEAMS_KEY),
        ]);

        const pinnedTeams: PinnedTeams = pinnedStored ? JSON.parse(pinnedStored) : {};
        pinnedTeams[leagueId] = teamId;
        await AsyncStorage.setItem(PINNED_TEAMS_KEY, JSON.stringify(pinnedTeams));

        // If it's a user team, remove it from unpinned list
        if (isUserTeam) {
          const unpinnedTeams: UnpinnedUserTeams = unpinnedStored ? JSON.parse(unpinnedStored) : {};
          const currentUnpinned = unpinnedTeams[leagueId] || [];
          unpinnedTeams[leagueId] = currentUnpinned.filter((id) => id !== teamId);
          await AsyncStorage.setItem(UNPINNED_USER_TEAMS_KEY, JSON.stringify(unpinnedTeams));
          setUnpinnedUserTeamIds(unpinnedTeams[leagueId]);
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPinnedTeamId(teamId);
      } catch (error) {
        console.error('[PinnedTeam]: Error pinning team:', error);
      }
    },
    [leagueId],
  );

  // Unpin a team (if it's a user team, add to unpinned list)
  const unpinTeam = useCallback(
    async (teamId: string, isUserTeam: boolean) => {
      try {
        const [pinnedStored, unpinnedStored] = await Promise.all([
          AsyncStorage.getItem(PINNED_TEAMS_KEY),
          AsyncStorage.getItem(UNPINNED_USER_TEAMS_KEY),
        ]);

        if (pinnedStored) {
          const pinnedTeams: PinnedTeams = JSON.parse(pinnedStored);
          delete pinnedTeams[leagueId];
          await AsyncStorage.setItem(PINNED_TEAMS_KEY, JSON.stringify(pinnedTeams));
        }

        // If it's a user team, add to unpinned list
        if (isUserTeam) {
          const unpinnedTeams: UnpinnedUserTeams = unpinnedStored ? JSON.parse(unpinnedStored) : {};
          const currentUnpinned = unpinnedTeams[leagueId] || [];
          if (!currentUnpinned.includes(teamId)) {
            unpinnedTeams[leagueId] = [...currentUnpinned, teamId];
            await AsyncStorage.setItem(UNPINNED_USER_TEAMS_KEY, JSON.stringify(unpinnedTeams));
            setUnpinnedUserTeamIds(unpinnedTeams[leagueId]);
          }
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPinnedTeamId(null);
      } catch (error) {
        console.error('[PinnedTeam]: Error unpinning team:', error);
      }
    },
    [leagueId],
  );

  // Toggle pin state
  const togglePin = useCallback(
    async (teamId: string, isUserTeam: boolean) => {
      if (pinnedTeamId === teamId) {
        await unpinTeam(teamId, isUserTeam);
      } else {
        await pinTeam(teamId, isUserTeam);
      }
    },
    [pinnedTeamId, pinTeam, unpinTeam],
  );

  // Check if a specific team is pinned (explicitly or by default for user teams)
  const isPinned = useCallback(
    (teamId: string, isUserTeam: boolean) => {
      // Explicitly pinned
      if (pinnedTeamId === teamId) return true;
      // User teams are pinned by default unless explicitly unpinned
      if (isUserTeam && !unpinnedUserTeamIds.includes(teamId)) return true;
      return false;
    },
    [pinnedTeamId, unpinnedUserTeamIds],
  );

  // Check if a user team is explicitly unpinned
  const isUserTeamUnpinned = useCallback(
    (teamId: string) => unpinnedUserTeamIds.includes(teamId),
    [unpinnedUserTeamIds],
  );

  return {
    pinnedTeamId,
    unpinnedUserTeamIds,
    isLoading,
    pinTeam,
    unpinTeam,
    togglePin,
    isPinned,
    isUserTeamUnpinned,
  };
};
