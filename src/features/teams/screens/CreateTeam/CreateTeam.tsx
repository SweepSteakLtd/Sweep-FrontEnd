import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { SectionList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { PlayerAvatarStack } from '~/features/my-teams/components/PlayerAvatarStack';
import { PlayerListItem } from '~/features/players/components/PlayerListItem/PlayerListItem';
import { PlayerListItemSkeleton } from '~/features/players/components/PlayerListItemSkeleton/PlayerListItemSkeleton';
import type { RootStackParamList } from '~/navigation/types';
import type { GroupPlayer } from '~/services/apis/schemas';
import {
  Container,
  EmptySelectionText,
  GroupHeader,
  GroupHeaderRight,
  GroupHeaderText,
  GroupSelectedText,
  HelpText,
  SearchInput,
  SectionTitle,
  SelectedCount,
  SelectedPlayersContainer,
  TeamNameInput,
  ViewOnlyBanner,
  ViewOnlyText,
} from './styles';
import { useTeamScreen } from './useCreateTeamScreen';

type TeamScreenRouteProp = RouteProp<RootStackParamList, 'Team'>;

export const TeamScreen = () => {
  const theme = useTheme();
  const route = useRoute<TeamScreenRouteProp>();
  const {
    leagueId,
    joinCode,
    teamId,
    teamName: initialTeamName,
    playerIds,
    tournamentStartTime,
  } = route.params;

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
    canSubmit,
    isEditMode,
    isViewOnly,
    isGroupExpanded,
    toggleGroupExpanded,
    handlePlayerToggle,
    handleSubmit,
    getSelectedPlayerForGroup,
    isPlayerSelected,
  } = useTeamScreen(leagueId, joinCode, {
    teamId,
    teamName: initialTeamName,
    playerIds,
    tournamentStartTime,
  });

  const selectedPlayers = useMemo(() => {
    return allPlayers.filter((player) => selectedPlayerIds.includes(player.id || ''));
  }, [allPlayers, selectedPlayerIds]);

  const renderPlayer = ({ item }: { item: GroupPlayer }) => {
    if (isViewOnly) return null;
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
    if (isViewOnly) return null;
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

  const screenTitle = isViewOnly ? 'View Team' : isEditMode ? 'Edit Team' : 'Create Team';

  if (isLoading) {
    return (
      <ScreenWrapper title={screenTitle}>
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
    <ScreenWrapper title={screenTitle}>
      <Container>
        <SectionList
          sections={sections}
          renderItem={renderPlayer}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id || ''}
          ListHeaderComponent={
            <>
              {isViewOnly && (
                <ViewOnlyBanner>
                  <ViewOnlyText>
                    Tournament has started. You can no longer edit this team.
                  </ViewOnlyText>
                </ViewOnlyBanner>
              )}

              <SectionTitle>Team Name</SectionTitle>
              <TeamNameInput
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter your team name"
                placeholderTextColor={theme.colors.text.secondary}
                editable={!isViewOnly}
                style={isViewOnly ? { opacity: 0.6 } : undefined}
              />

              <SectionTitle>
                Selected Players{' '}
                {selectedPlayerIds.length > 0 && (
                  <SelectedCount>({selectedPlayerIds.length} selected)</SelectedCount>
                )}
              </SectionTitle>

              <SelectedPlayersContainer>
                {selectedPlayers.length > 0 ? (
                  <PlayerAvatarStack players={selectedPlayers} />
                ) : (
                  <EmptySelectionText>No players selected</EmptySelectionText>
                )}
              </SelectedPlayersContainer>

              {!isViewOnly && (
                <>
                  <SectionTitle>Available Players</SectionTitle>
                  <HelpText>You can only select one player from each group</HelpText>

                  <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search by name or country"
                    placeholderTextColor={theme.colors.text.secondary}
                  />
                </>
              )}
            </>
          }
          ListFooterComponent={
            !isViewOnly ? (
              <Button
                title={isEditMode ? 'Save Changes' : 'Create Team'}
                onPress={handleSubmit}
                disabled={!canSubmit}
                loading={isPending}
                fullWidth
                style={{ marginTop: 24, marginBottom: 40 }}
              />
            ) : (
              <></>
            )
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </Container>
    </ScreenWrapper>
  );
};
