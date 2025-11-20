import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Button } from '~/components/Button/Button';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { PlayerListItem } from '~/features/players/components/PlayerListItem/PlayerListItem';
import { PlayerListItemSkeleton } from '~/features/players/components/PlayerListItemSkeleton/PlayerListItemSkeleton';
import type { RootStackParamList } from '~/navigation/types';
import { useGetPlayerProfiles } from '~/services/apis/PlayerProfile/useGetPlayerProfiles';
import type { PlayerProfile } from '~/services/apis/schemas';
import { useCreateTeam } from '~/services/apis/Team/useCreateTeam';
import { SelectedPlayersList } from '../../components/SelectedPlayersList/SelectedPlayersList';
import {
  Container,
  EmptyText,
  SearchInput,
  SectionTitle,
  SelectedCount,
  TeamNameInput,
} from './styles';

type CreateTeamRouteProp = RouteProp<RootStackParamList, 'CreateTeam'>;

export const CreateTeam = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<CreateTeamRouteProp>();
  const { leagueId } = route.params;
  const { showAlert } = useAlert();

  const [teamName, setTeamName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: players = [], isLoading } = useGetPlayerProfiles();
  const createTeam = useCreateTeam();

  // Filter players based on search query
  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || player.country?.toLowerCase().includes(query);
  });

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      }
      return [...prev, playerId];
    });
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      showAlert({
        title: 'Error',
        message: 'Please enter a team name',
      });
      return;
    }

    if (selectedPlayers.length === 0) {
      showAlert({
        title: 'Error',
        message: 'Please select at least one player',
      });
      return;
    }

    try {
      await createTeam.mutateAsync({
        name: teamName,
        league_id: leagueId,
        players: selectedPlayers,
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
    } catch (error) {
      showAlert({
        title: 'Error',
        message: 'Failed to create team. Please try again.',
      });
    }
  };

  const renderPlayer = ({ item }: { item: PlayerProfile }) => {
    const isSelected = selectedPlayers.includes(item.id || '');

    return (
      <PlayerListItem
        player={item}
        isSelected={isSelected}
        onPress={() => handlePlayerToggle(item.id || '')}
      />
    );
  };

  const renderSkeletonOrPlayer = ({ item }: { item: PlayerProfile | null }) => {
    if (isLoading) {
      return <PlayerListItemSkeleton />;
    }
    return renderPlayer({ item: item as PlayerProfile });
  };

  return (
    <ScreenWrapper title="Create Team">
      <Container>
        <FlatList
          data={isLoading ? Array(8).fill(null) : filteredPlayers}
          renderItem={renderSkeletonOrPlayer}
          keyExtractor={(item, index) =>
            isLoading ? `skeleton-${index}` : (item as PlayerProfile).id || ''
          }
          ListHeaderComponent={
            <>
              <SectionTitle>Team Name</SectionTitle>
              <TeamNameInput
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter your team name"
                placeholderTextColor={theme.colors.text.secondary}
              />

              <SectionTitle>
                Selected Players{' '}
                {selectedPlayers.length > 0 && (
                  <SelectedCount>({selectedPlayers.length} selected)</SelectedCount>
                )}
              </SectionTitle>

              <SelectedPlayersList players={players} selectedPlayerIds={selectedPlayers} />

              <SectionTitle>Available Players</SectionTitle>

              <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search by name or country"
                placeholderTextColor={theme.colors.text.secondary}
              />
            </>
          }
          ListEmptyComponent={
            <EmptyText>{isLoading ? 'Loading players...' : 'No players found'}</EmptyText>
          }
          ListFooterComponent={
            <Button
              title="Create Team"
              onPress={handleCreateTeam}
              disabled={!teamName.trim() || selectedPlayers.length === 0 || createTeam.isPending}
              loading={createTeam.isPending}
              fullWidth
              style={{ marginTop: 24, marginBottom: 40 }}
            />
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </Container>
    </ScreenWrapper>
  );
};
