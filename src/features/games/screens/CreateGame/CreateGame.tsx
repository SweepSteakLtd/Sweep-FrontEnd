import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { CreateGameForm } from '~/features/tournaments/components/CreateGameForm/CreateGameForm';
import { JoinCodeDisplay } from '~/features/tournaments/components/JoinCodeDisplay/JoinCodeDisplay';
import type { RootStackParamList } from '~/navigation/types';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { Container } from './styles';

type CreateGameRouteProp = RouteProp<RootStackParamList, 'CreateGame'>;
type CreateGameNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateGame = () => {
  const route = useRoute<CreateGameRouteProp>();
  const navigation = useNavigation<CreateGameNavigationProp>();
  const { data: tournaments = [] } = useGetTournaments();

  const [showJoinCode, setShowJoinCode] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [createdGameName, setCreatedGameName] = useState('');

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: showJoinCode ? 'Game Created' : 'Create Game',
    });
  }, [navigation, showJoinCode]);

  const handleSuccess = () => {
    // Navigate back to tournament games after successful creation
    navigation.goBack();
  };

  const handlePrivateGameCreated = (code: string, gameName: string) => {
    setJoinCode(code);
    setCreatedGameName(gameName);
    setShowJoinCode(true);
  };

  const activeTournament = tournaments.find((t) => t.id === route.params.tournamentId);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showJoinCode ? (
          <JoinCodeDisplay
            gameName={createdGameName}
            tournamentName={activeTournament?.name || ''}
            joinCode={joinCode}
          />
        ) : (
          <CreateGameForm
            key={`${route.params.tournamentId}-${route.params.defaultGameType}`}
            activeTournamentId={route.params.tournamentId}
            tournaments={tournaments}
            defaultGameType={route.params.defaultGameType}
            onSuccess={handleSuccess}
            onPrivateGameCreated={handlePrivateGameCreated}
          />
        )}
      </ScrollView>
    </Container>
  );
};
