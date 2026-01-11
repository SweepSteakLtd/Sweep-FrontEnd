import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { ProgressIndicator } from '~/components/ProgressIndicator/ProgressIndicator';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import { PlayerListItem } from '~/features/players/components/PlayerListItem/PlayerListItem';
import { PlayerListItemSkeleton } from '~/features/players/components/PlayerListItemSkeleton/PlayerListItemSkeleton';
import type { TournamentStackParamList } from '~/navigation/types';
import {
  PlaceholderPlayerCard,
  SelectedPlayerCard,
} from '../../components/SelectedPlayerCard/SelectedPlayerCard';
import {
  Container,
  CurrentGroupTitle,
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
  ErrorTitle,
  FloatingButtonContainer,
  PlayersListContainer,
  SectionTitle,
  SelectedCount,
  SelectedPlayersContainer,
  SelectedPlayersScroll,
  SelectionHint,
  TeamNameInput,
  ViewOnlyBanner,
  ViewOnlyText,
} from './styles';
import { useTeamScreen } from './useCreateTeamScreen';

type TeamScreenRouteProp = RouteProp<TournamentStackParamList, 'Team'>;

export const TeamScreen = () => {
  const theme = useTheme();
  const { tournamentTheme } = useTournamentTheme();
  const navigation = useNavigation<NativeStackNavigationProp<TournamentStackParamList>>();
  const route = useRoute<TeamScreenRouteProp>();
  const {
    leagueId,
    joinCode,
    teamId,
    teamName: initialTeamName,
    playerIds,
    tournamentStartTime,
  } = route.params ?? {};

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const {
    teamName,
    setTeamName,
    allPlayers,
    selectedPlayerIds,
    groupNames,
    currentStep,
    completedSteps,
    currentGroup,
    currentGroupPlayers,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    isLoading,
    isError,
    hasNoPlayers,
    isPending,
    canSubmit,
    isEditMode,
    isViewOnly,
    handlePlayerToggle,
    handleSubmit,
    isPlayerSelected,
  } = useTeamScreen(leagueId, joinCode, {
    teamId,
    teamName: initialTeamName,
    playerIds,
    tournamentStartTime,
  });

  const selectedPlayersByGroupMap = useMemo(() => {
    const map = new Map<string, (typeof allPlayers)[0] | null>();
    // Initialize all groups with null (placeholder)
    groupNames.forEach((groupName) => {
      map.set(groupName, null);
    });
    // Fill in selected players
    allPlayers.forEach((player) => {
      if (player && selectedPlayerIds.includes(player.id || '') && player.group) {
        map.set(player.group, player);
      }
    });
    return map;
  }, [allPlayers, selectedPlayerIds, groupNames]);

  const allGroupsSelected = selectedPlayerIds.length === groupNames.length && groupNames.length > 0;
  const isTeamNameStep = allGroupsSelected && currentStep === groupNames.length;

  const screenTitle = isViewOnly ? 'View Team' : isEditMode ? 'Edit Team' : 'Create Team';

  if (isLoading) {
    return (
      <ScreenWrapper title={screenTitle} headerBackgroundColor={tournamentTheme.primary}>
        <Container style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <SectionTitle>Loading players...</SectionTitle>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <PlayerListItemSkeleton key={`skeleton-${index}`} />
            ))}
        </Container>
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper title={screenTitle} headerBackgroundColor={tournamentTheme.primary}>
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We couldn't load the available players. Please check your connection and try again
            later.
          </ErrorMessage>
        </ErrorContainer>
      </ScreenWrapper>
    );
  }

  if (hasNoPlayers && !isEditMode) {
    return (
      <ScreenWrapper title={screenTitle} headerBackgroundColor={tournamentTheme.primary}>
        <ErrorContainer>
          <ErrorIcon>🏌️</ErrorIcon>
          <ErrorTitle>No Players Available</ErrorTitle>
          <ErrorMessage>
            There are no players available for team selection at the moment. Please come back later
            when players have been added to the tournament.
          </ErrorMessage>
        </ErrorContainer>
      </ScreenWrapper>
    );
  }

  const stepLabels = groupNames.map((name) => `Group ${name}`);

  return (
    <ScreenWrapper title={screenTitle} headerBackgroundColor={tournamentTheme.primary}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          {isViewOnly && (
            <ViewOnlyBanner>
              <ViewOnlyText>Tournament has started. You can no longer edit this team.</ViewOnlyText>
            </ViewOnlyBanner>
          )}

          {isViewOnly && (
            <>
              <SectionTitle>Team Name</SectionTitle>
              <TeamNameInput
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter your team name"
                placeholderTextColor={theme.colors.text.secondary}
                editable={false}
                style={{ opacity: 0.6 }}
              />
            </>
          )}

          <SectionTitle>
            Your Team{' '}
            {selectedPlayerIds.length > 0 && (
              <SelectedCount>
                ({selectedPlayerIds.length}/{groupNames.length})
              </SelectedCount>
            )}
          </SectionTitle>

          <SelectedPlayersContainer>
            <SelectedPlayersScroll horizontal showsHorizontalScrollIndicator={false}>
              {groupNames.map((groupName) => {
                const player = selectedPlayersByGroupMap.get(groupName);
                return player ? (
                  <SelectedPlayerCard
                    key={player.id}
                    player={player}
                    onRemove={!isViewOnly ? () => handlePlayerToggle(player) : undefined}
                    disabled={isViewOnly}
                  />
                ) : (
                  <PlaceholderPlayerCard key={`placeholder-${groupName}`} groupName={groupName} />
                );
              })}
            </SelectedPlayersScroll>
          </SelectedPlayersContainer>

          {!isViewOnly && (
            <>
              <ProgressIndicator
                variant="dots"
                steps={stepLabels}
                currentStep={isTeamNameStep ? groupNames.length - 1 : currentStep}
                completedSteps={completedSteps}
                style={isTeamNameStep ? { opacity: 0.2 } : undefined}
              />

              <Animated.View
                key={isTeamNameStep ? 'team-name' : `step-${currentStep}`}
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(150)}
              >
                {isTeamNameStep ? (
                  <>
                    <CurrentGroupTitle>Name Your Team</CurrentGroupTitle>
                    <SelectionHint>Give your team a unique name</SelectionHint>
                    <TeamNameInput
                      value={teamName}
                      onChangeText={setTeamName}
                      placeholder="Enter your team name"
                      placeholderTextColor={theme.colors.text.secondary}
                      autoFocus
                    />
                  </>
                ) : (
                  <>
                    <CurrentGroupTitle>
                      Select from Group {currentGroup?.name || groupNames[currentStep]}
                    </CurrentGroupTitle>
                    <SelectionHint>You can only select one player from each group</SelectionHint>

                    <PlayersListContainer>
                      {currentGroupPlayers.map((player) => (
                        <PlayerListItem
                          key={player.id}
                          player={player}
                          isSelected={isPlayerSelected(player.id || '')}
                          onPress={() => handlePlayerToggle(player)}
                          showOdds={false}
                        />
                      ))}
                    </PlayersListContainer>
                  </>
                )}
              </Animated.View>
            </>
          )}
        </Container>
      </ScrollView>

      {!isViewOnly && (
        <FloatingButtonContainer>
          <Button
            title="Previous"
            onPress={goToPreviousStep}
            disabled={isFirstStep && !isTeamNameStep}
            style={{ flex: 1, marginRight: 8 }}
          />
          {isTeamNameStep ? (
            <Button
              title={isEditMode ? 'Save Changes' : 'Create Team'}
              onPress={handleSubmit}
              disabled={!canSubmit}
              loading={isPending}
              variant="secondary"
              style={{ flex: 1, marginLeft: 8 }}
              primaryColor={tournamentTheme.primary}
            />
          ) : (
            <Button
              title="Next"
              onPress={goToNextStep}
              disabled={isLastStep && !allGroupsSelected}
              style={{ flex: 1, marginLeft: 8 }}
              variant="secondary"
              primaryColor={tournamentTheme.primary}
            />
          )}
        </FloatingButtonContainer>
      )}
    </ScreenWrapper>
  );
};
