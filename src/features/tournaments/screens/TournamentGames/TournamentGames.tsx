import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useLayoutEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { JoinGameList } from '~/features/tournaments/components/JoinGameList/JoinGameList';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { RootStackParamList } from '~/navigation/types';
import type { Game } from '~/services/apis/Game/types';
import { useDeleteGame } from '~/services/apis/Game/useDeleteGame';
import { useGetGames } from '~/services/apis/Game/useGetGames';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { Container, EmptyState, PotInfo, PotLabel } from './styles';
import { TournamentGamesSkeleton } from './TournamentGamesSkeleton';

type TournamentGamesRouteProp = RouteProp<RootStackParamList, 'TournamentGames'>;
type TournamentGamesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TournamentGames = () => {
  const route = useRoute<TournamentGamesRouteProp>();
  const navigation = useNavigation<TournamentGamesNavigationProp>();
  const theme = useTheme();

  const tournamentId = route.params?.tournamentId || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGameTab, setActiveGameTab] = useState('featured');

  const handleGameTabChange = (tab: string) => {
    setActiveGameTab(tab);
  };

  // Debounce search query for API calls
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const { data: tournaments = [] } = useGetTournaments();

  const currentTournament = tournaments.find((t) => t.id === tournamentId);

  const {
    data: games = [],
    isLoading: gamesLoading,
    isFetching: gamesFetching,
    error: gamesError,
    refetch: refetchGames,
  } = useGetGames(
    {
      searchTerm: debouncedSearchQuery || undefined,
      tournamentId: tournamentId || undefined,
    },
    true,
  );

  // Calculate total pot from current games
  const totalPotForTournament = games.reduce(
    (sum, game) => sum + (game.entry_fee ?? 0) * (game.max_participants ?? 0),
    0,
  );

  const deleteGameMutation = useDeleteGame();

  const handleRefresh = async () => {
    await refetchGames();
  };

  const handleGameDelete = async (gameId: string) => {
    try {
      await deleteGameMutation.mutateAsync(gameId);
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };

  const handleCreateGame = useCallback(() => {
    // Default to 'private' if on private tab, otherwise 'public' (for featured and public tabs)
    const defaultGameType = activeGameTab === 'private' ? 'private' : 'public';

    navigation.navigate('CreateGame', {
      tournamentId: tournamentId,
      defaultGameType,
    });
  }, [activeGameTab, tournamentId, navigation]);

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: currentTournament?.name || 'Tournament',
    });
  }, [navigation, currentTournament]);

  const handleGamePress = (game: Game) => {
    // Navigate to game details
    console.log('Game pressed:', game.id);
  };

  // Show full skeleton only on true initial load (isLoading means no cached data)
  // isFetching can be true even with cached data (background refetch)
  if (gamesLoading) {
    return <TournamentGamesSkeleton />;
  }

  if (gamesError) {
    return (
      <Container>
        <EmptyState>
          <PotLabel>Failed to load data</PotLabel>
          <PotLabel style={{ fontSize: 14, marginTop: 8 }}>
            {gamesError?.message || 'Please try again later'}
          </PotLabel>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={gamesFetching && games.length > 0}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <PotInfo>
          <PotLabel>Total Staked</PotLabel>
          <AnimatedAmount
            value={totalPotForTournament}
            variant="title"
            color={theme.colors.text.secondary}
            align="center"
            weight="bold"
          />
        </PotInfo>
        <JoinGameList
          games={games}
          onGamePress={handleGamePress}
          onGameDelete={handleGameDelete}
          onCreateGame={handleCreateGame}
          loading={gamesFetching}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeGameTab={activeGameTab}
          onGameTabChange={handleGameTabChange}
        />
      </ScrollView>
    </Container>
  );
};
