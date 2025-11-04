import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { CreateLeagueForm } from '~/features/tournaments/components/CreateLeagueForm/CreateLeagueForm';
import { JoinCodeDisplay } from '~/features/tournaments/components/JoinCodeDisplay/JoinCodeDisplay';
import type { RootStackParamList } from '~/navigation/types';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { ButtonContainer, Container, ScrollContent } from './styles';

type CreateLeagueRouteProp = RouteProp<RootStackParamList, 'CreateLeague'>;
type CreateLeagueNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateLeague = () => {
  const route = useRoute<CreateLeagueRouteProp>();
  const navigation = useNavigation<CreateLeagueNavigationProp>();
  const { data: tournaments = [] } = useGetTournaments();
  const theme = useTheme();

  const [showJoinCode, setShowJoinCode] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [createdLeagueName, setCreatedLeagueName] = useState('');
  const [submitHandler, setSubmitHandler] = useState<(() => Promise<void>) | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: showJoinCode ? 'League Created' : 'Create League',
    });
  }, [navigation, showJoinCode]);

  const handleSuccess = () => {
    // Navigate back to tournament games after successful creation
    navigation.goBack();
  };

  const handlePrivateLeagueCreated = (code: string, leagueName: string) => {
    setJoinCode(code);
    setCreatedLeagueName(leagueName);
    setShowJoinCode(true);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={['bottom']}>
      <Container>
        <ScrollContent showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: 20 }}>
          {showJoinCode ? (
            <JoinCodeDisplay
              leagueName={createdLeagueName}
              tournamentName={activeTournament?.name || ''}
              joinCode={joinCode}
            />
          ) : (
            <CreateLeagueForm
              key={`${route.params.tournamentId}-${route.params.defaultLeagueType}`}
              activeTournamentId={route.params.tournamentId}
              tournaments={tournaments}
              defaultLeagueType={route.params.defaultLeagueType}
              onSuccess={handleSuccess}
              onPrivateLeagueCreated={handlePrivateLeagueCreated}
              onSubmit={handleSubmit}
            />
          )}
        </ScrollContent>
        {!showJoinCode && (
          <ButtonContainer>
            <Button variant="secondary" onPress={handleCreateLeague} loading={isLoading}>
              Create League
            </Button>
          </ButtonContainer>
        )}
      </Container>
    </SafeAreaView>
  );
};
