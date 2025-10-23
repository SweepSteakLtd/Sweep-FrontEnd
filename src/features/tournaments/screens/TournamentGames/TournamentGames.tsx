import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { TabBar } from '~/components/TabBar/TabBar';
import { JoinGameList } from '~/features/tournaments/components/JoinGameList/JoinGameList';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { RootStackParamList } from '~/navigation/types';
import type { Game } from '~/services/apis/Game/types';
import { useDeleteGame } from '~/services/apis/Game/useDeleteGame';
import { useGetGames } from '~/services/apis/Game/useGetGames';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import {
  Container,
  CreateButton,
  CreateButtonText,
  EmptyState,
  PotInfo,
  PotLabel,
  SegmentedTabWrapper,
} from './styles';
import { TournamentGamesSkeleton } from './TournamentGamesSkeleton';

type TournamentGamesRouteProp = RouteProp<RootStackParamList, 'TournamentGames'>;
type TournamentGamesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TournamentGames = () => {
  const route = useRoute<TournamentGamesRouteProp>();
  const navigation = useNavigation<TournamentGamesNavigationProp>();
  const theme = useTheme();

  const [activeTournament, setActiveTournament] = useState(route.params?.tournamentId || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPotForTournament, setTotalPotForTournament] = useState(0);
  const [activeGameTab, setActiveGameTab] = useState('featured');

  const handleGameTabChange = (tab: string) => {
    setActiveGameTab(tab);
  };

  // Debounce search query for API calls
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const {
    data: tournaments = [],
    error: tournamentsError,
    refetch: refetchTournaments,
  } = useGetTournaments();

  const {
    data: games = [],
    isLoading: gamesLoading,
    isFetching: gamesFetching,
    error: gamesError,
    refetch: refetchGames,
  } = useGetGames(
    {
      searchTerm: debouncedSearchQuery || undefined,
      tournamentId: activeTournament || undefined,
    },
    true,
  );

  const deleteGameMutation = useDeleteGame();

  const handleRefresh = async () => {
    await Promise.all([refetchTournaments(), refetchGames()]);
  };

  const handleGameDelete = async (gameId: string) => {
    try {
      await deleteGameMutation.mutateAsync(gameId);
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };

  // Transform tournaments to tabs format
  const tournamentTabs = tournaments.map((tournament) => ({
    id: tournament.id,
    label: tournament.name,
  }));

  const handleCreateGame = useCallback(() => {
    // Default to 'private' if on private tab, otherwise 'public' (for featured and public tabs)
    const defaultGameType = activeGameTab === 'private' ? 'private' : 'public';

    navigation.navigate('CreateGame', {
      tournamentId: activeTournament || tournaments[0]?.id || '1',
      defaultGameType,
    });
  }, [activeGameTab, activeTournament, tournaments, navigation]);

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'LIVE',
      headerRight: () => (
        <CreateButton onPress={handleCreateGame}>
          <CreateButtonText>+</CreateButtonText>
        </CreateButton>
      ),
    });
  }, [navigation, handleCreateGame]);

  // Set active tournament from route params or default to first tournament when loaded
  useEffect(() => {
    if (!activeTournament && tournaments.length > 0) {
      setActiveTournament(route.params?.tournamentId || tournaments[0].id);
    }
  }, [tournaments, route.params?.tournamentId, activeTournament]);

  // Update total pot when we have unfiltered games data (no search)
  useEffect(() => {
    if (!debouncedSearchQuery && games.length > 0) {
      const total = games.reduce(
        (sum, game) => sum + (game.entry_fee ?? 0) * (game.max_participants ?? 0),
        0,
      );
      setTotalPotForTournament(total);
    }
  }, [games, debouncedSearchQuery]);

  const handleGamePress = (game: Game) => {
    // Navigate to game details
    console.log('Game pressed:', game.id);
  };

  // Show full skeleton only on true initial load (isLoading means no cached data)
  // isFetching can be true even with cached data (background refetch)
  if (gamesLoading && tournaments.length === 0) {
    // Very first load - show full skeleton
    return (
      <TournamentGamesSkeleton
        tournamentTabs={tournamentTabs}
        activeTournament={activeTournament}
        onTabPress={setActiveTournament}
      />
    );
  }

  if (tournamentsError || gamesError) {
    return (
      <Container>
        <EmptyState>
          <PotLabel>Failed to load data</PotLabel>
          <PotLabel style={{ fontSize: 14, marginTop: 8 }}>
            {tournamentsError?.message || gamesError?.message || 'Please try again later'}
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
        {/* Level 1: Tournament Tabs */}
        <SegmentedTabWrapper>
          <TabBar
            tabs={tournamentTabs}
            activeTab={activeTournament}
            onTabPress={setActiveTournament}
            loading={false}
          />
        </SegmentedTabWrapper>

        <PotInfo>
          <PotLabel>
            {activeTournament
              ? `Total Staked in ${tournaments.find((t) => t.id === activeTournament)?.name || 'this tournament'}`
              : 'Total Staked'}
          </PotLabel>
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
