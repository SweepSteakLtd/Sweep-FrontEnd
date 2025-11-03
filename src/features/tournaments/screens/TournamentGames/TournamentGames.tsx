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
import type { League } from '~/services/apis/League/types';
import { useDeleteLeague } from '~/services/apis/League/useDeleteLeague';
import { useGetLeagues } from '~/services/apis/League/useGetLeagues';
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
    data: leagues = [],
    isLoading: leaguesLoading,
    isFetching: leaguesFetching,
    error: leaguesError,
    refetch: refetchLeagues,
  } = useGetLeagues(
    {
      searchTerm: debouncedSearchQuery || undefined,
      tournamentId: tournamentId || undefined,
    },
    true,
  );

  // Calculate total pot from current leagues
  const totalPotForTournament = leagues.reduce(
    (sum, league) => sum + (league.entry_fee ?? 0) * (league.max_participants ?? 0),
    0,
  );

  const deleteLeagueMutation = useDeleteLeague();

  const handleRefresh = async () => {
    await refetchLeagues();
  };

  const handleLeagueDelete = async (leagueId: string) => {
    try {
      await deleteLeagueMutation.mutateAsync(leagueId);
    } catch (error) {
      console.error('Failed to delete league:', error);
    }
  };

  const handleCreateLeague = useCallback(() => {
    // Default to 'private' if on private tab, otherwise 'public' (for featured and public tabs)
    const defaultLeagueType = activeGameTab === 'private' ? 'private' : 'public';

    navigation.navigate('CreateLeague', {
      tournamentId: tournamentId,
      defaultLeagueType,
    });
  }, [activeGameTab, tournamentId, navigation]);

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: currentTournament?.name || 'Tournament',
    });
  }, [navigation, currentTournament]);

  const handleLeaguePress = (league: League) => {
    // Navigate to league details
    console.log('League pressed:', league.id);
  };

  // Show full skeleton only on true initial load (isLoading means no cached data)
  // isFetching can be true even with cached data (background refetch)
  if (leaguesLoading) {
    return <TournamentGamesSkeleton />;
  }

  if (leaguesError) {
    return (
      <Container>
        <EmptyState>
          <PotLabel>Failed to load data</PotLabel>
          <PotLabel style={{ fontSize: 14, marginTop: 8 }}>
            {leaguesError?.message || 'Please try again later'}
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
            refreshing={leaguesFetching && leagues.length > 0}
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
          games={leagues}
          onGamePress={handleLeaguePress}
          onGameDelete={handleLeagueDelete}
          onCreateGame={handleCreateLeague}
          loading={leaguesFetching}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeGameTab={activeGameTab}
          onGameTabChange={handleGameTabChange}
        />
      </ScrollView>
    </Container>
  );
};
