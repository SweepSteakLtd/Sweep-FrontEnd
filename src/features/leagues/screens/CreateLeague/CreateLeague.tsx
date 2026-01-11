import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import { CreateLeagueForm } from '~/features/tournaments/components/CreateLeagueForm/CreateLeagueForm';
import type { TournamentStackParamList } from '~/navigation/types';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { LeagueCreatedSuccess } from '../../components/LeagueCreatedSuccess/LeagueCreatedSuccess';
import { ButtonContainer, Container } from './styles';

type CreateLeagueRouteProp = RouteProp<TournamentStackParamList, 'CreateLeague'>;
type CreateLeagueNavigationProp = NativeStackNavigationProp<TournamentStackParamList>;

type CreatedLeagueState = {
  leagueId: string;
  leagueName: string;
  isPrivate: boolean;
  joinCode?: string;
} | null;

export const CreateLeague = () => {
  const route = useRoute<CreateLeagueRouteProp>();
  const navigation = useNavigation<CreateLeagueNavigationProp>();
  const { tournamentTheme } = useTournamentTheme();
  const { data: tournaments = [] } = useGetTournaments();

  const [createdLeague, setCreatedLeague] = useState<CreatedLeagueState>(null);
  const [submitHandler, setSubmitHandler] = useState<(() => Promise<void>) | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSuccess = (
    leagueId: string,
    leagueName: string,
    isPrivate: boolean,
    joinCode?: string,
  ) => {
    setCreatedLeague({ leagueId, leagueName, isPrivate, joinCode });
  };

  const handleViewLeague = () => {
    if (!createdLeague) return;

    // Navigate to league home, replacing this screen
    navigation.replace('LeagueHome', {
      leagueId: createdLeague.leagueId,
      joinCode: createdLeague.joinCode,
    });
  };

  const handleSubmit = (handler: () => Promise<void>) => {
    setSubmitHandler(() => handler);
  };

  const handleCreateLeague = async () => {
    if (submitHandler) {
      setIsLoading(true);
      try {
        await submitHandler();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const activeTournament = tournaments.find((t) => t.id === route.params.tournamentId);

  // Show success screen after league is created
  if (createdLeague) {
    return (
      <ScreenWrapper title="League Created" headerBackgroundColor={tournamentTheme.primary}>
        <LeagueCreatedSuccess
          leagueName={createdLeague.leagueName}
          tournamentName={activeTournament?.name || ''}
          joinCode={createdLeague.joinCode}
          isPrivate={createdLeague.isPrivate}
          onViewLeague={handleViewLeague}
          primaryColor={tournamentTheme.primary}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Create League" headerBackgroundColor={tournamentTheme.primary}>
      <Container>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingTop: 20 }}
          bottomOffset={140}
        >
          <CreateLeagueForm
            key={`${route.params.tournamentId}-${route.params.defaultLeagueType}`}
            activeTournamentId={route.params.tournamentId}
            tournaments={tournaments}
            defaultLeagueType={route.params.defaultLeagueType}
            onSuccess={handleSuccess}
            onSubmit={handleSubmit}
            activeColor={tournamentTheme.primary}
          />
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button
              variant="secondary"
              onPress={handleCreateLeague}
              loading={isLoading}
              title="Create League"
              primaryColor={tournamentTheme.primary}
            />
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
