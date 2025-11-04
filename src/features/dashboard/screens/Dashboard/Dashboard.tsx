import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Avatar } from '~/components/Avatar/Avatar';
import { TournamentCard } from '~/features/dashboard/components/TournamentCard/TournamentCard';
import { TournamentCardSkeleton } from '~/features/dashboard/components/TournamentCard/TournamentCardSkeleton';
import type { RootStackParamList } from '~/navigation/types';
import type { Tournament } from '~/services/apis/schemas';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';
import {
  Container,
  EmptyState,
  EmptyStateText,
  ProfileBalance,
  ProfileButton,
  TournamentGrid,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { data: user } = useGetUser();
  const {
    data: tournaments = [],
    isLoading: loading,
    isFetching,
    error,
    refetch,
  } = useGetTournaments();

  const formatBalance = (balance?: number) => {
    if (balance === undefined || balance === null) return '£0.00';
    return `£${balance.toFixed(2)}`;
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Tournaments',
      headerBackVisible: false,
      headerLeft: () => null,
      headerRight: () => (
        <ProfileButton onPress={handleProfilePress}>
          <ProfileBalance>{formatBalance(user?.current_balance)}</ProfileBalance>
          <Avatar size={32} />
        </ProfileButton>
      ),
    });
  }, [navigation, user]);

  const handleTournamentPress = (tournament: Tournament) => {
    // Navigate to the games listing screen for this tournament
    if (tournament.id) {
      navigation.navigate('TournamentLeagues', { tournamentId: tournament.id });
    }
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
            keyExtractor={(item) => item.id || Math.random().toString()}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isFetching && !loading}
                onRefresh={handleRefresh}
                tintColor={theme.colors.primary}
              />
            }
          />
        </TournamentGrid>
      )}
    </Container>
  );
};
