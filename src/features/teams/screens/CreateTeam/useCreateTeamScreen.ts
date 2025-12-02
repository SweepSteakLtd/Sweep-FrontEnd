import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import type { RootStackParamList } from '~/navigation/types';
import { ApiError } from '~/services/apis/apiClient';
import { useGetPlayerProfiles } from '~/services/apis/PlayerProfile/useGetPlayerProfiles';
import type { GroupPlayer } from '~/services/apis/schemas';
import { useCreateTeam } from '~/services/apis/Team/useCreateTeam';
import { useUpdateTeam } from '~/services/apis/Team/useUpdateTeam';

interface Section {
  title: string;
  groupName: string;
  hasSelection: boolean;
  data: GroupPlayer[];
}

interface TeamScreenParams {
  teamId?: string;
  teamName?: string;
  playerIds?: string[];
  tournamentStartTime?: string;
}

export const useTeamScreen = (leagueId: string, joinCode?: string, params?: TeamScreenParams) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { showAlert } = useAlert();

  const isEditMode = !!params?.teamId;
  const isViewOnly =
    isEditMode && params?.tournamentStartTime
      ? new Date(params.tournamentStartTime) <= new Date()
      : false;

  const [teamName, setTeamName] = useState(params?.teamName || '');
  const [selectedPlayersByGroup, setSelectedPlayersByGroup] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [initialized, setInitialized] = useState(false);

  const { data: playerGroups = [], isLoading, isError } = useGetPlayerProfiles();

  // Check if no players are available after loading
  const hasNoPlayers = !isLoading && !isError && playerGroups.length === 0;
  const createTeamMutation = useCreateTeam();
  const updateTeamMutation = useUpdateTeam(params?.teamId || '');

  const allPlayers = useMemo(() => {
    return playerGroups.flatMap((group) => group.players ?? []).filter((p) => p != null);
  }, [playerGroups]);

  // Initialize edit/view mode with existing player selections
  useEffect(() => {
    if (isEditMode && params?.playerIds && playerGroups.length > 0 && !initialized) {
      const newSelectedByGroup: Record<string, string> = {};

      params.playerIds.forEach((playerId) => {
        const player = allPlayers.find((p) => p.id === playerId);
        if (player?.group) {
          newSelectedByGroup[player.group] = playerId;
        }
      });

      setSelectedPlayersByGroup(newSelectedByGroup);
      setInitialized(true);
    }
  }, [isEditMode, params?.playerIds, playerGroups, allPlayers, initialized]);

  const selectedPlayerIds = useMemo(() => {
    return Object.values(selectedPlayersByGroup);
  }, [selectedPlayersByGroup]);

  const isGroupExpanded = useCallback(
    (groupName: string) => {
      if (expandedGroups[groupName] !== undefined) {
        return expandedGroups[groupName];
      }
      return !selectedPlayersByGroup[groupName];
    },
    [expandedGroups, selectedPlayersByGroup],
  );

  const toggleGroupExpanded = useCallback(
    (groupName: string) => {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupName]: !isGroupExpanded(groupName),
      }));
    },
    [isGroupExpanded],
  );

  const sections = useMemo((): Section[] => {
    const query = searchQuery.toLowerCase();
    return playerGroups
      .filter((group) => group.name !== undefined)
      .map((group) => {
        const groupName = group.name!;
        const hasSelection = !!selectedPlayersByGroup[groupName];
        const expanded = isGroupExpanded(groupName);

        if (!expanded && hasSelection) {
          return {
            title: `Group ${groupName}`,
            groupName,
            hasSelection,
            data: [] as GroupPlayer[],
          };
        }

        const filteredPlayers = (group.players ?? [])
          .filter((player: GroupPlayer) => {
            if (!player) return false;
            const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
            return fullName.includes(query) || player.country?.toLowerCase().includes(query);
          })
          .sort((a, b) => {
            // Sort alphabetically by last name, then first name
            const lastNameCompare = (a.last_name ?? '').localeCompare(b.last_name ?? '');
            if (lastNameCompare !== 0) return lastNameCompare;
            return (a.first_name ?? '').localeCompare(b.first_name ?? '');
          });

        return {
          title: `Group ${groupName}`,
          groupName,
          hasSelection,
          data: filteredPlayers,
        };
      })
      .filter((section) => section.data.length > 0 || section.hasSelection);
  }, [playerGroups, searchQuery, selectedPlayersByGroup, isGroupExpanded]);

  const handlePlayerToggle = useCallback((player: GroupPlayer) => {
    const groupName = player.group;
    if (!groupName || !player.id) return;
    const playerId = player.id;

    setSelectedPlayersByGroup((prev): Record<string, string> => {
      if (prev[groupName] === playerId) {
        const newState: Record<string, string> = {};
        Object.keys(prev).forEach((key) => {
          if (key !== groupName) {
            newState[key] = prev[key];
          }
        });
        return newState;
      }
      return { ...prev, [groupName]: playerId };
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!teamName.trim()) {
      showAlert({
        title: 'Error',
        message: 'Please enter a team name',
      });
      return;
    }

    if (selectedPlayerIds.length === 0) {
      showAlert({
        title: 'Error',
        message: 'Please select at least one player',
      });
      return;
    }

    try {
      if (isEditMode) {
        await updateTeamMutation.mutateAsync({
          name: teamName,
          players: selectedPlayerIds,
        });

        showAlert({
          title: 'Success',
          message: 'Team updated successfully!',
          buttons: [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
        });
      } else {
        await createTeamMutation.mutateAsync({
          name: teamName,
          league_id: leagueId,
          players: selectedPlayerIds,
          join_code: joinCode,
        });

        // Navigate directly to leaderboard after successful team creation
        navigation.replace('Leaderboard', { leagueId });
      }
    } catch (error) {
      // Use the API error message if available (e.g., "You have reached the maximum number of teams")
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : isEditMode
            ? 'Failed to update team. Please try again.'
            : 'Failed to create team. Please try again.';

      showAlert({
        title: 'Error',
        message: errorMessage,
      });
    }
  }, [
    teamName,
    selectedPlayerIds,
    leagueId,
    isEditMode,
    createTeamMutation,
    updateTeamMutation,
    showAlert,
    navigation,
    joinCode,
  ]);

  const getSelectedPlayerForGroup = useCallback(
    (groupName: string) => {
      const selectedPlayerId = selectedPlayersByGroup[groupName];
      return selectedPlayerId ? allPlayers.find((p) => p.id === selectedPlayerId) : null;
    },
    [selectedPlayersByGroup, allPlayers],
  );

  const isPlayerSelected = useCallback(
    (playerId: string) => selectedPlayerIds.includes(playerId),
    [selectedPlayerIds],
  );

  const isPending = isEditMode ? updateTeamMutation.isPending : createTeamMutation.isPending;
  const canSubmit = teamName.trim() && selectedPlayerIds.length > 0 && !isPending;

  const handleSelectPlayerById = useCallback((groupName: string, playerId: string) => {
    setSelectedPlayersByGroup((prev): Record<string, string> => {
      if (prev[groupName] === playerId) {
        const newState: Record<string, string> = {};
        Object.keys(prev).forEach((key) => {
          if (key !== groupName) {
            newState[key] = prev[key];
          }
        });
        return newState;
      }
      return { ...prev, [groupName]: playerId };
    });
  }, []);

  return {
    teamName,
    setTeamName,
    searchQuery,
    setSearchQuery,
    sections,
    playerGroups,
    allPlayers,
    selectedPlayerIds,
    selectedPlayersByGroup,
    isLoading,
    isError,
    hasNoPlayers,
    isPending,
    canSubmit,
    isEditMode,
    isViewOnly,
    isGroupExpanded,
    toggleGroupExpanded,
    handlePlayerToggle,
    handleSelectPlayerById,
    handleSubmit,
    getSelectedPlayerForGroup,
    isPlayerSelected,
  };
};
