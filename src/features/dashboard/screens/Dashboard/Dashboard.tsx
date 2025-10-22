import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useAuth } from '~/contexts/AuthContext';
import {
  Tournament,
  TournamentCard,
} from '~/features/dashboard/components/TournamentCard/TournamentCard';
import type { RootStackParamList } from '~/navigation/types';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import {
  Container,
  EmptyState,
  EmptyStateText,
  LogoutButton,
  LogoutText,
  TournamentGrid,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { signOut } = useAuth();
  const { data: tournaments = [], isLoading: loading } = useGetTournaments();

  const handleLogout = async () => {
    await signOut();
  };

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Tournaments',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerLeft: () => null,
      headerRight: () => (
        <LogoutButton onPress={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      ),
    });
  }, [navigation, theme]);

  const handleTournamentPress = (tournament: Tournament) => {
    // Navigate to the games listing screen for this tournament
    navigation.navigate('TournamentGames', { tournamentId: tournament.id });
  };

  if (loading) {
    return (
      <Container>
        <EmptyState>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      {tournaments.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No tournaments available</EmptyStateText>
        </EmptyState>
      ) : (
        <TournamentGrid>
          <FlatList
            data={tournaments}
            renderItem={({ item }) => (
              <TournamentCard tournament={item} onPress={() => handleTournamentPress(item)} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </TournamentGrid>
      )}
    </Container>
  );
};
