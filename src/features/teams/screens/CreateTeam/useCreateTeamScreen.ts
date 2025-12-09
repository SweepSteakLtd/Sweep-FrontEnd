import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import type { RootStackParamList } from '~/navigation/types';
import { ApiError } from '~/services/apis/apiClient';
import { useGetPlayerProfiles } from '~/services/apis/PlayerProfile/useGetPlayerProfiles';
import type { TeamPlayer } from '~/services/apis/Team/types';
import { useCreateTeam } from '~/services/apis/Team/useCreateTeam';
import { useUpdateTeam } from '~/services/apis/Team/useUpdateTeam';

interface Section {
  title: string;
  groupName: string;
  hasSelection: boolean;
  data: TeamPlayer[];
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
  const [currentStep, setCurrentStep] = useState(0);
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

  // Get group names for step navigation
  const groupNames = useMemo(() => {
    return playerGroups
      .filter((group) => group.name !== undefined)
      .map((group) => group.name!)
      .sort();
  }, [playerGroups]);

  // Get completed steps (groups with selected players)
  const completedSteps = useMemo(() => {
    return groupNames
      .map((name, index) => (selectedPlayersByGroup[name] ? index : -1))
      .filter((index) => index !== -1);
  }, [groupNames, selectedPlayersByGroup]);

  // Get current group based on step
  const currentGroup = useMemo(() => {
    if (groupNames.length === 0) return null;
    return playerGroups.find((g) => g.name === groupNames[currentStep]) || null;
  }, [playerGroups, groupNames, currentStep]);

  // Get players for current group (sorted alphabetically)
  const currentGroupPlayers = useMemo(() => {
    if (!currentGroup?.players) return [];
    return [...currentGroup.players]
      .filter((p) => p != null)
      .sort((a, b) => {
        const lastNameCompare = (a.last_name ?? '').localeCompare(b.last_name ?? '');
        if (lastNameCompare !== 0) return lastNameCompare;
        return (a.first_name ?? '').localeCompare(b.first_name ?? '');
      });
  }, [currentGroup]);

  // Step navigation
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < groupNames.length) {
        setCurrentStep(step);
      }
    },
    [groupNames.length],
  );

  const allGroupsSelected =
    groupNames.length > 0 && groupNames.every((name) => !!selectedPlayersByGroup[name]);

  const goToNextStep = useCallback(() => {
    // If all groups are selected and we're on the last group, go to team name step
    if (allGroupsSelected && currentStep === groupNames.length - 1) {
      setCurrentStep(groupNames.length); // Team name step
    } else if (currentStep < groupNames.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, groupNames.length, allGroupsSelected]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === groupNames.length - 1;

  // Legacy sections for backwards compatibility
  const sections = useMemo((): Section[] => {
    return playerGroups
      .filter((group) => group.name !== undefined)
      .map((group) => {
        const groupName = group.name!;
        const hasSelection = !!selectedPlayersByGroup[groupName];

        const sortedPlayers = (group.players ?? [])
          .filter((player: TeamPlayer) => player != null)
          .sort((a, b) => {
            const lastNameCompare = (a.last_name ?? '').localeCompare(b.last_name ?? '');
            if (lastNameCompare !== 0) return lastNameCompare;
            return (a.first_name ?? '').localeCompare(b.first_name ?? '');
          });

        return {
          title: `Group ${groupName}`,
          groupName,
          hasSelection,
          data: sortedPlayers,
        };
      });
  }, [playerGroups, selectedPlayersByGroup]);

  const handlePlayerToggle = useCallback(
    (player: TeamPlayer, autoAdvance = true) => {
      const groupName = player.group;
      if (!groupName || !player.id) return;
      const playerId = player.id;

      setSelectedPlayersByGroup((prev): Record<string, string> => {
        const isDeselecting = prev[groupName] === playerId;

        if (isDeselecting) {
          const newState: Record<string, string> = {};
          Object.keys(prev).forEach((key) => {
            if (key !== groupName) {
              newState[key] = prev[key];
            }
          });

          // Stay on current group if deselecting from current group
          const currentGroupName = groupNames[currentStep];
          if (groupName !== currentGroupName) {
            // Navigate to the deselected group
            const deselectedGroupIndex = groupNames.indexOf(groupName);
            if (deselectedGroupIndex !== -1) {
              setTimeout(() => {
                setCurrentStep(deselectedGroupIndex);
              }, 300);
            }
          }

          return newState;
        }

        const newState = { ...prev, [groupName]: playerId };

        // Auto advance to first unfilled group after selection, or to team name step if all filled
        if (autoAdvance) {
          const firstUnfilledIndex = groupNames.findIndex((name) => !newState[name]);
          if (firstUnfilledIndex !== -1) {
            setTimeout(() => {
              setCurrentStep(firstUnfilledIndex);
            }, 300);
          } else {
            // All groups filled, go to team name step
            setTimeout(() => {
              setCurrentStep(groupNames.length);
            }, 300);
          }
        }

        return newState;
      });
    },
    [groupNames, currentStep],
  );

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
    // Team data
    teamName,
    setTeamName,
    sections,
    playerGroups,
    allPlayers,
    selectedPlayerIds,
    selectedPlayersByGroup,

    // Step navigation
    currentStep,
    groupNames,
    completedSteps,
    currentGroup,
    currentGroupPlayers,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,

    // Loading states
    isLoading,
    isError,
    hasNoPlayers,
    isPending,
    canSubmit,
    isEditMode,
    isViewOnly,

    // Actions
    handlePlayerToggle,
    handleSelectPlayerById,
    handleSubmit,
    getSelectedPlayerForGroup,
    isPlayerSelected,
  };
};
