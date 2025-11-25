import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { useGetPlayerProfiles } from '~/services/apis/PlayerProfile/useGetPlayerProfiles';
import type { GroupPlayer } from '~/services/apis/schemas';
import { useCreateTeam } from '~/services/apis/Team/useCreateTeam';

interface Section {
  title: string;
  groupName: string;
  hasSelection: boolean;
  data: GroupPlayer[];
}

export const useCreateTeamScreen = (leagueId: string) => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();

  const [teamName, setTeamName] = useState('');
  const [selectedPlayersByGroup, setSelectedPlayersByGroup] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const { data: playerGroups = [], isLoading } = useGetPlayerProfiles();
  const createTeamMutation = useCreateTeam();

  const allPlayers = useMemo(() => {
    return playerGroups.flatMap((group) => group.players);
  }, [playerGroups]);

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

        return {
          title: `Group ${groupName}`,
          groupName,
          hasSelection,
          data: group.players.filter((player: GroupPlayer) => {
            const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
            return fullName.includes(query) || player.country?.toLowerCase().includes(query);
          }),
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

  const handleCreateTeam = useCallback(async () => {
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
      await createTeamMutation.mutateAsync({
        name: teamName,
        league_id: leagueId,
        players: selectedPlayerIds,
      });

      showAlert({
        title: 'Success',
        message: 'Team created successfully!',
        buttons: [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      });
    } catch {
      showAlert({
        title: 'Error',
        message: 'Failed to create team. Please try again.',
      });
    }
  }, [teamName, selectedPlayerIds, leagueId, createTeamMutation, showAlert, navigation]);

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

  const canCreateTeam =
    teamName.trim() && selectedPlayerIds.length > 0 && !createTeamMutation.isPending;

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
    isPending: createTeamMutation.isPending,
    canCreateTeam,
    isGroupExpanded,
    toggleGroupExpanded,
    handlePlayerToggle,
    handleSelectPlayerById,
    handleCreateTeam,
    getSelectedPlayerForGroup,
    isPlayerSelected,
  };
};
