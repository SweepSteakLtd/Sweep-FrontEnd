import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { CreateGameForm } from '~/features/tournaments/components/CreateGameForm/CreateGameForm';
import type { RootStackParamList } from '~/navigation/types';
import { Container } from './styles';

type CreateGameRouteProp = RouteProp<RootStackParamList, 'CreateGame'>;
type CreateGameNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateGame = () => {
  const route = useRoute<CreateGameRouteProp>();
  const navigation = useNavigation<CreateGameNavigationProp>();

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Game',
    });
  }, [navigation]);

  const handleSuccess = () => {
    // Navigate back to tournament games after successful creation
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateGameForm
          key={`${route.params.tournamentId}-${route.params.defaultGameType}`}
          activeTournamentId={route.params.tournamentId}
          defaultGameType={route.params.defaultGameType}
          onSuccess={handleSuccess}
        />
      </ScrollView>
    </Container>
  );
};
