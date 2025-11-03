import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { CreateLeagueForm } from '~/features/tournaments/components/CreateLeagueForm/CreateLeagueForm';
import { JoinCodeDisplay } from '~/features/tournaments/components/JoinCodeDisplay/JoinCodeDisplay';
import type { RootStackParamList } from '~/navigation/types';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { Container } from './styles';

type CreateLeagueRouteProp = RouteProp<RootStackParamList, 'CreateLeague'>;
type CreateLeagueNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateLeague = () => {
  const route = useRoute<CreateLeagueRouteProp>();
  const navigation = useNavigation<CreateLeagueNavigationProp>();
  const { data: tournaments = [] } = useGetTournaments();

  const [showJoinCode, setShowJoinCode] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [createdLeagueName, setCreatedLeagueName] = useState('');

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

  const activeTournament = tournaments.find((t) => t.id === route.params.tournamentId);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          />
        )}
      </ScrollView>
    </Container>
  );
};
