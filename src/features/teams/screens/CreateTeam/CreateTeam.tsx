import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { SectionList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { PlayerListItem } from '~/features/players/components/PlayerListItem/PlayerListItem';
import { PlayerListItemSkeleton } from '~/features/players/components/PlayerListItemSkeleton/PlayerListItemSkeleton';
import type { RootStackParamList } from '~/navigation/types';
import type { GroupPlayer } from '~/services/apis/schemas';
import { SelectedPlayersList } from '../../components/SelectedPlayersList/SelectedPlayersList';
import {
  Container,
  GroupHeader,
  GroupHeaderRight,
  GroupHeaderText,
  GroupSelectedText,
  HelpText,
  SearchInput,
  SectionTitle,
  SelectedCount,
  TeamNameInput,
} from './styles';
import { useCreateTeamScreen } from './useCreateTeamScreen';

type CreateTeamRouteProp = RouteProp<RootStackParamList, 'CreateTeam'>;

export const CreateTeam = () => {
  const theme = useTheme();
  const route = useRoute<CreateTeamRouteProp>();
  const { leagueId, joinCode } = route.params;

  const {
    teamName,
    setTeamName,
    searchQuery,
    setSearchQuery,
    sections,
    allPlayers,
    selectedPlayerIds,
    isLoading,
    isPending,
    canCreateTeam,
    isGroupExpanded,
    toggleGroupExpanded,
    handlePlayerToggle,
    handleCreateTeam,
    getSelectedPlayerForGroup,
    isPlayerSelected,
  } = useCreateTeamScreen(leagueId, joinCode);

  const renderPlayer = ({ item }: { item: GroupPlayer }) => {
    return (
      <PlayerListItem
        player={item}
        isSelected={isPlayerSelected(item.id || '')}
        onPress={() => handlePlayerToggle(item)}
      />
    );
  };

  const renderSectionHeader = ({
    section,
  }: {
    section: { title: string; groupName: string; hasSelection: boolean };
  }) => {
    const expanded = isGroupExpanded(section.groupName);
    const selectedPlayer = getSelectedPlayerForGroup(section.groupName);

    return (
      <GroupHeader onPress={() => toggleGroupExpanded(section.groupName)}>
        <GroupHeaderText>
          {section.title} {expanded ? '▼' : '▶'}
        </GroupHeaderText>
        <GroupHeaderRight>
          {selectedPlayer && (
            <GroupSelectedText>
              ✓ {selectedPlayer.first_name} {selectedPlayer.last_name}
            </GroupSelectedText>
          )}
        </GroupHeaderRight>
      </GroupHeader>
    );
  };

  if (isLoading) {
    return (
      <ScreenWrapper title="Create Team">
        <Container style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <SectionTitle>Team Name</SectionTitle>
          <TeamNameInput
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Enter your team name"
            placeholderTextColor={theme.colors.text.secondary}
          />
          <SectionTitle>Available Players</SectionTitle>
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <PlayerListItemSkeleton key={`skeleton-${index}`} />
            ))}
        </Container>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Create Team">
      <Container>
        <SectionList
          sections={sections}
          renderItem={renderPlayer}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id || ''}
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
                {selectedPlayerIds.length > 0 && (
                  <SelectedCount>({selectedPlayerIds.length} selected)</SelectedCount>
                )}
              </SectionTitle>

              <SelectedPlayersList players={allPlayers} selectedPlayerIds={selectedPlayerIds} />

              <SectionTitle>Available Players</SectionTitle>
              <HelpText>You can only select one player from each group</HelpText>

              <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search by name or country"
                placeholderTextColor={theme.colors.text.secondary}
              />
            </>
          }
          ListFooterComponent={
            <Button
              title="Create Team"
              onPress={handleCreateTeam}
              disabled={!canCreateTeam}
              loading={isPending}
              fullWidth
              style={{ marginTop: 24, marginBottom: 40 }}
            />
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </Container>
    </ScreenWrapper>
  );
};
