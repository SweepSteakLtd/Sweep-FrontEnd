import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { CreateGameForm } from '~/features/tournaments/components/CreateGameForm/CreateGameForm';
import type { RootStackParamList } from '~/navigation/types';
import { Container } from './styles';

type CreateGameRouteProp = RouteProp<RootStackParamList, 'CreateGame'>;
type CreateGameNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateGame = () => {
  const route = useRoute<CreateGameRouteProp>();
  const navigation = useNavigation<CreateGameNavigationProp>();
  const theme = useTheme();

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Game',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerBackTitle: '',
    });
  }, [navigation, theme]);

  const handleSuccess = () => {
    // Navigate back to tournament games after successful creation
    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateGameForm activeTournamentId={route.params.tournamentId} onSuccess={handleSuccess} />
      </ScrollView>
    </Container>
  );
};
