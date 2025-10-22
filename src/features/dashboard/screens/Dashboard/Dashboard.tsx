import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useAuth } from '~/contexts/AuthContext';
import {
  Tournament,
  TournamentCard,
} from '~/features/dashboard/components/TournamentCard/TournamentCard';
import { TournamentCardSkeleton } from '~/features/dashboard/components/TournamentCard/TournamentCardSkeleton';
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
  const { data: tournaments = [], isLoading: loading, error } = useGetTournaments();

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
      headerBackVisible: false,
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
        <TournamentGrid>
          <View style={{ padding: 20 }}>
            {/* Show 3 skeleton cards while loading */}
            {[...Array(3)].map((_, index) => (
              <TournamentCardSkeleton key={index} />
            ))}
          </View>
        </TournamentGrid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <EmptyState>
          <EmptyStateText>Failed to load tournaments</EmptyStateText>
          <EmptyStateText style={{ fontSize: 14, marginTop: 8, opacity: 0.7 }}>
            {error.message || 'Please try again later'}
          </EmptyStateText>
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
