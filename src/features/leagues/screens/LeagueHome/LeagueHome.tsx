import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { HolesInfoCarousel } from '../../components/HolesInfoCarousel/HolesInfoCarousel';
import { HowToPlay } from '../../components/HowToPlay/HowToPlay';
import { LeagueDates } from '../../components/LeagueDates/LeagueDates';
import { LeagueDescription } from '../../components/LeagueDescription/LeagueDescription';
import { LeagueHeader } from '../../components/LeagueHeader/LeagueHeader';
import { PrivateLeagueGate } from '../../components/PrivateLeagueGate/PrivateLeagueGate';
import { TournamentBanner } from '../../components/TournamentBanner/TournamentBanner';
import { useLeague } from '../../hooks/useLeague';
import { LeagueHomeSkeleton } from './LeagueHomeSkeleton';
import { ButtonsContainer, Container, ScrollContent } from './styles';

type LeagueHomeRouteProp = RouteProp<RootStackParamList, 'LeagueHome'>;

export const LeagueHome = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<LeagueHomeRouteProp>();
  const { leagueId, joinCode: routeJoinCode } = route.params;

  const {
    league,
    tournament,
    carouselData,
    totalPot,
    currentEntries,
    maxEntries,
    isLoading,
    isOwner,
    joinCode,
    isPrivateLeagueError,
    inputJoinCode,
    setInputJoinCode,
    joinError,
    handleJoinWithCode,
    hasAttemptedJoin,
    submittedJoinCode,
  } = useLeague(leagueId, routeJoinCode);

  if (isLoading) {
    return <LeagueHomeSkeleton />;
  }

  // Show join code input for private leagues
  if (isPrivateLeagueError) {
    return (
      <PrivateLeagueGate
        joinCode={inputJoinCode}
        onJoinCodeChange={setInputJoinCode}
        onSubmit={handleJoinWithCode}
        error={joinError}
        hasAttemptedJoin={hasAttemptedJoin}
      />
    );
  }

  return (
    <ScreenWrapper title="League Home">
      <Container>
        <ScrollContent>
          <LeagueHeader
            leagueName={league?.name}
            currentEntries={currentEntries}
            maxEntries={maxEntries}
            totalPot={totalPot}
            joinCode={joinCode}
            isOwner={isOwner}
          />

          <TournamentBanner tournament={tournament} />

          <ButtonsContainer>
            <Button
              title="Submit your fantasy list of golfers"
              variant="secondary"
              onPress={() => {
                navigation.navigate('Team', { leagueId, joinCode: submittedJoinCode });
              }}
              fullWidth
            />
            <Button
              title="View Leaderboard"
              onPress={() => {
                navigation.navigate('Leaderboard', { leagueId });
              }}
              backgroundColor={theme.colors.secondary}
              fullWidth
            />
          </ButtonsContainer>

          <LeagueDates startTime={league?.start_time} endTime={league?.end_time} />

          <LeagueDescription description={league?.description} />

          <HolesInfoCarousel tournamentName={tournament?.name} carouselData={carouselData} />

          <HowToPlay rules={tournament?.rules} instructions={tournament?.instructions} />
        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
};
