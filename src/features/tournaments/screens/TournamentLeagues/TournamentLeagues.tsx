import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { JoinLeagueList } from '~/features/tournaments/components/JoinLeagueList/JoinLeagueList';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { RootStackParamList } from '~/navigation/types';
import type { League } from '~/services/apis/League/types';
import { useGetLeagues } from '~/services/apis/League/useGetLeagues';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { penceToPounds } from '~/utils/currency';
import { Container, EmptyState, PotInfo, PotLabel } from './styles';
import { TournamentLeaguesSkeleton } from './TournamentLeaguesSkeleton';

type TournamentLeaguesRouteProp = RouteProp<RootStackParamList, 'TournamentLeagues'>;
type TournamentLeaguesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TournamentLeagues = () => {
  const route = useRoute<TournamentLeaguesRouteProp>();
  const navigation = useNavigation<TournamentLeaguesNavigationProp>();
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
      tournament_id: tournamentId || undefined,
      search_term: debouncedSearchQuery || undefined,
    },
    true,
  );

  // Calculate total pot from current leagues
  const totalPotForTournament = leagues.reduce(
    (sum, league) => sum + (league.entry_fee ?? 0) * (league.max_participants ?? 0),
    0,
  );

  const handleRefresh = async () => {
    await refetchLeagues();
  };

  const handleCreateLeague = useCallback(() => {
    // Default to 'private' if on private tab, otherwise 'public' (for featured and public tabs)
    const defaultLeagueType = activeGameTab === 'private' ? 'private' : 'public';

    navigation.navigate('CreateLeague', {
      tournamentId: tournamentId,
      defaultLeagueType,
    });
  }, [activeGameTab, tournamentId, navigation]);

  const handleLeaguePress = (league: League) => {
    if (league.id) {
      navigation.navigate('LeagueHome', { leagueId: league.id });
    }
  };

  // Show full skeleton only on true initial load (isLoading means no cached data)
  // isFetching can be true even with cached data (background refetch)
  if (leaguesLoading) {
    return (
      <ScreenWrapper title={currentTournament?.name || 'Tournament'}>
        <TournamentLeaguesSkeleton />
      </ScreenWrapper>
    );
  }

  if (leaguesError) {
    return (
      <ScreenWrapper title={currentTournament?.name || 'Tournament'}>
        <Container>
          <EmptyState>
            <PotLabel>Failed to load data</PotLabel>
            <PotLabel style={{ fontSize: 14, marginTop: 8 }}>
              {leaguesError?.message || 'Please try again later'}
            </PotLabel>
          </EmptyState>
        </Container>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title={currentTournament?.name || 'Tournament'}>
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
              value={penceToPounds(totalPotForTournament)}
              variant="title"
              color={theme.colors.text.secondary}
              align="center"
              weight="bold"
              decimals={2}
            />
          </PotInfo>
          <JoinLeagueList
            leagues={leagues}
            onLeaguePress={handleLeaguePress}
            onCreateLeague={handleCreateLeague}
            loading={leaguesFetching}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeLeagueTab={activeGameTab}
            onLeagueTabChange={handleGameTabChange}
          />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
