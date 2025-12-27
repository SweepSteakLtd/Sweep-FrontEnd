import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { Button } from '~/components/Button/Button';
import { BackArrowIcon } from '~/components/Icon/BackArrowIcon';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import { JoinLeagueList } from '~/features/tournaments/components/JoinLeagueList/JoinLeagueList';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { TournamentStackParamList } from '~/navigation/types';
import type { League } from '~/services/apis/League/types';
import { useGetLeagues } from '~/services/apis/League/useGetLeagues';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { penceToPounds } from '~/utils/currency';

import {
  AmountWrapper,
  Container,
  EmptyState,
  GlobalStatsContainer,
  HeaderBackgroundImage,
  HeaderOverlay,
  HeaderSection,
  PotInfo,
  PotLabel,
  StatItem,
  StatLabel,
  StatValue,
  TournamentName,
} from './styles';
import { TournamentLeaguesSkeleton } from './TournamentLeaguesSkeleton';

type TournamentLeaguesRouteProp = RouteProp<TournamentStackParamList, 'TournamentLeagues'>;
type TournamentLeaguesNavigationProp = NativeStackNavigationProp<TournamentStackParamList>;

export const TournamentLeagues = () => {
  const route = useRoute<TournamentLeaguesRouteProp>();
  const navigation = useNavigation<TournamentLeaguesNavigationProp>();
  const { tournamentTheme } = useTournamentTheme();

  const tournamentId = route.params?.tournamentId || '';
  const [activeGameTab, setActiveGameTab] = useState('featured');

  // Independent search state per tab
  const [publicSearchQuery, setPublicSearchQuery] = useState('');
  const [privateSearchQuery, setPrivateSearchQuery] = useState('');

  // Get current search query based on active tab
  const currentSearchQuery = activeGameTab === 'private' ? privateSearchQuery : publicSearchQuery;
  const setCurrentSearchQuery =
    activeGameTab === 'private' ? setPrivateSearchQuery : setPublicSearchQuery;

  const handleGameTabChange = (tab: string) => {
    setActiveGameTab(tab);
  };

  // Debounce search queries for API calls
  const debouncedPublicSearchQuery = useDebouncedValue(publicSearchQuery, 500);
  const debouncedPrivateSearchQuery = useDebouncedValue(privateSearchQuery, 500);

  const { data: tournaments = [] } = useGetTournaments();
  const { data: currentUser } = useGetUser();

  const currentTournament = tournaments.find((t) => t.id === tournamentId);

  // Fetch public/featured leagues (uses search_term which respects privacy)
  const {
    data: publicLeagues = [],
    isLoading: publicLeaguesLoading,
    isFetching: publicLeaguesFetching,
    error: publicLeaguesError,
    refetch: refetchPublicLeagues,
  } = useGetLeagues(
    {
      tournament_id: tournamentId || undefined,
      search_term: debouncedPublicSearchQuery || undefined,
    },
    activeGameTab !== 'private', // Only fetch when not on private tab
  );

  // Fetch private leagues (uses name parameter which bypasses privacy filters)
  const {
    data: privateSearchLeagues = [],
    isLoading: privateLeaguesLoading,
    isFetching: privateLeaguesFetching,
    error: privateLeaguesError,
    refetch: refetchPrivateLeagues,
  } = useGetLeagues(
    {
      tournament_id: tournamentId || undefined,
      name: debouncedPrivateSearchQuery || undefined,
    },
    activeGameTab === 'private' && !!debouncedPrivateSearchQuery, // Only fetch when on private tab and searching
  );

  // Combined loading/error states based on active tab
  const leaguesLoading = activeGameTab === 'private' ? privateLeaguesLoading : publicLeaguesLoading;
  const leaguesFetching =
    activeGameTab === 'private' ? privateLeaguesFetching : publicLeaguesFetching;
  const leaguesError = activeGameTab === 'private' ? privateLeaguesError : publicLeaguesError;
  const leagues = activeGameTab === 'private' ? privateSearchLeagues : publicLeagues;

  // Filter leagues where current user is owner or member (for private tab when not searching)
  // Uses publicLeagues since those are fetched with search_term which includes user's private leagues
  const userPrivateLeagues = publicLeagues.filter((league) => {
    if (league.type !== 'private' || !currentUser?.id) return false;
    const isOwner = league.owner_id === currentUser.id;
    const isMember = league.joined_players?.includes(currentUser.id) ?? false;
    return isOwner || isMember;
  });

  // Calculate total pot from public leagues (consistent stats regardless of tab)
  const totalPotForTournament = publicLeagues.reduce(
    (sum, league) => sum + (league.entry_fee ?? 0) * (league.max_participants ?? 0),
    0,
  );

  // Calculate global stats from public leagues (consistent regardless of tab)
  const totalLeagues = publicLeagues.length;
  const totalEntrants = publicLeagues.reduce(
    (sum, league) => sum + (league.joined_players?.length ?? 0),
    0,
  );

  const handleRefresh = async () => {
    if (activeGameTab === 'private') {
      await refetchPrivateLeagues();
    } else {
      await refetchPublicLeagues();
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

  const handleLeaguePress = (league: League) => {
    if (!league.id) return;

    // Navigate directly to LeagueHome - it handles private league join code flow
    navigation.navigate('LeagueHome', { leagueId: league.id });
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Show full skeleton only on true initial load (isLoading means no cached data)
  // isFetching can be true even with cached data (background refetch)
  if (leaguesLoading) {
    return (
      <ScreenWrapper title="Tournament" headerBackgroundColor={tournamentTheme.primary}>
        <TournamentLeaguesSkeleton />
      </ScreenWrapper>
    );
  }

  if (leaguesError) {
    return (
      <ScreenWrapper title="Tournament" headerBackgroundColor={tournamentTheme.primary}>
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
    <ScreenWrapper
      title="Tournament Leagues"
      headerBackgroundColor={tournamentTheme.primary}
    >
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={leaguesFetching && leagues.length > 0}
              onRefresh={handleRefresh}
              tintColor={tournamentTheme.primary}
            />
          }
        >
          <HeaderSection backgroundColor={tournamentTheme.secondary}>
            {currentTournament?.cover_picture && (
              <HeaderBackgroundImage
                source={{ uri: currentTournament.cover_picture }}
                resizeMode="cover"
              />
            )}
            <HeaderOverlay>
              {currentTournament?.name && <TournamentName>{currentTournament.name}</TournamentName>}
              <PotInfo>
                <PotLabel>Total Staked</PotLabel>
                <AmountWrapper>
                  <AnimatedAmount
                    value={penceToPounds(totalPotForTournament)}
                    variant="title"
                    align="center"
                    weight="bold"
                    decimals={2}
                    color={tournamentTheme.primary}
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 2,
                    }}
                  />
                </AmountWrapper>
              </PotInfo>
              <GlobalStatsContainer>
                <StatItem>
                  <StatValue
                    color={tournamentTheme.primary}
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 2,
                    }}
                  >
                    {totalLeagues}
                  </StatValue>
                  <StatLabel>Leagues</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue
                    color={tournamentTheme.primary}
                    style={{
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 2,
                    }}
                  >
                    {totalEntrants}
                  </StatValue>
                  <StatLabel>Entrants</StatLabel>
                </StatItem>
              </GlobalStatsContainer>
            </HeaderOverlay>
          </HeaderSection>
          <JoinLeagueList
            leagues={leagues}
            userPrivateLeagues={userPrivateLeagues}
            onLeaguePress={handleLeaguePress}
            onCreateLeague={handleCreateLeague}
            loading={leaguesFetching}
            searchQuery={currentSearchQuery}
            onSearchChange={setCurrentSearchQuery}
            activeLeagueTab={activeGameTab}
            onLeagueTabChange={handleGameTabChange}
            activeTabColor={tournamentTheme.primary}
          />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
