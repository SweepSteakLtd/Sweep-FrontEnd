import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';

const PINNED_TEAMS_KEY = '@sweepsteak:pinned_teams';

interface PinnedTeams {
  [leagueId: string]: string; // leagueId -> team identifier (rank-teamName)
}

export const usePinnedTeam = (leagueId: string) => {
  const [pinnedTeamId, setPinnedTeamId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load pinned team from storage
  useEffect(() => {
    const loadPinnedTeam = async () => {
      try {
        const stored = await AsyncStorage.getItem(PINNED_TEAMS_KEY);
        if (stored) {
          const pinnedTeams: PinnedTeams = JSON.parse(stored);
          setPinnedTeamId(pinnedTeams[leagueId] || null);
        }
      } catch (error) {
        console.error('[PinnedTeam]: Error loading pinned team:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPinnedTeam();
  }, [leagueId]);

  // Pin a team
  const pinTeam = useCallback(
    async (teamId: string) => {
      try {
        const stored = await AsyncStorage.getItem(PINNED_TEAMS_KEY);
        const pinnedTeams: PinnedTeams = stored ? JSON.parse(stored) : {};
        pinnedTeams[leagueId] = teamId;
        await AsyncStorage.setItem(PINNED_TEAMS_KEY, JSON.stringify(pinnedTeams));
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPinnedTeamId(teamId);
      } catch (error) {
        console.error('[PinnedTeam]: Error pinning team:', error);
      }
    },
    [leagueId],
  );

  // Unpin the current team
  const unpinTeam = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(PINNED_TEAMS_KEY);
      if (stored) {
        const pinnedTeams: PinnedTeams = JSON.parse(stored);
        delete pinnedTeams[leagueId];
        await AsyncStorage.setItem(PINNED_TEAMS_KEY, JSON.stringify(pinnedTeams));
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPinnedTeamId(null);
    } catch (error) {
      console.error('[PinnedTeam]: Error unpinning team:', error);
    }
  }, [leagueId]);

  // Toggle pin state
  const togglePin = useCallback(
    async (teamId: string) => {
      if (pinnedTeamId === teamId) {
        await unpinTeam();
      } else {
        await pinTeam(teamId);
      }
    },
    [pinnedTeamId, pinTeam, unpinTeam],
  );

  // Check if a specific team is pinned
  const isPinned = useCallback((teamId: string) => pinnedTeamId === teamId, [pinnedTeamId]);

  return {
    pinnedTeamId,
    isLoading,
    pinTeam,
    unpinTeam,
    togglePin,
    isPinned,
  };
};
