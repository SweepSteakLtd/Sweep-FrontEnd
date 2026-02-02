import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, RefreshControl, ScrollView } from 'react-native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { TournamentBadges } from '~/components/TournamentBadges/TournamentBadges';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import { JoinLeagueList } from '~/features/tournaments/components/JoinLeagueList/JoinLeagueList';
import { useDebouncedValue } from '~/hooks/useDebouncedValue';
import type { TournamentStackParamList } from '~/navigation/types';
import type { League } from '~/services/apis/League/types';
import { useGetLeagues } from '~/services/apis/League/useGetLeagues';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';

import { Icon } from '~/components/Icon/Icon';
import { CURRENCY_FORMAT, ICON_SIZES } from '~/constants/ui';
import {
  Container,
  EmptyState,
  GlobalStatsContainer,
  HeaderBackgroundImage,
  HeaderOverlay,
  HeaderSection,
  NumberOfLeagues,
  PotLabel,
  PrizePool,
  PrizePoolAmount,
  StatItem,
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
  const [activeGameTab, setActiveGameTab] = useState('my_leagues');

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

  const currentTournament = tournaments.find(
    (t) => t.id === tournamentId || t.external_id === tournamentId,
  );

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

  // Defensive client-side filter (helps when mocks/backends ignore tournament_id query param)
  const tournamentPublicLeagues = useMemo(() => {
    if (!tournamentId) return publicLeagues;
    return publicLeagues.filter((league) => league.tournament_id === tournamentId);
  }, [publicLeagues, tournamentId]);

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

  const tournamentPrivateSearchLeagues = useMemo(() => {
    if (!tournamentId) return privateSearchLeagues;
    return privateSearchLeagues.filter((league) => league.tournament_id === tournamentId);
  }, [privateSearchLeagues, tournamentId]);

  // Combined loading/error states based on active tab
  const leaguesLoading = activeGameTab === 'private' ? privateLeaguesLoading : publicLeaguesLoading;
  const leaguesFetching =
    activeGameTab === 'private' ? privateLeaguesFetching : publicLeaguesFetching;
  const leaguesError = activeGameTab === 'private' ? privateLeaguesError : publicLeaguesError;
  const leagues =
    activeGameTab === 'private' ? tournamentPrivateSearchLeagues : tournamentPublicLeagues;

  // Filter leagues where current user is owner or member (for private tab when not searching)
  // Uses publicLeagues since those are fetched with search_term which includes user's private leagues
  const userPrivateLeagues = tournamentPublicLeagues.filter((league) => {
    if (league.type !== 'private' || !currentUser?.id) return false;
    const isOwner = league.owner_id === currentUser.id;
    const isMember = league.joined_players?.includes(currentUser.id) ?? false;
    return isOwner || isMember;
  });

  // Filter all leagues (public and private) where current user is a member (for My Leagues tab)
  // Only show leagues where user has joined, not where they are the owner
  const userLeagues = tournamentPublicLeagues.filter((league) => {
    if (!currentUser?.id) return false;
    const isMember = league.joined_players?.includes(currentUser.id) ?? false;
    return isMember;
  });

  // Calculate global stats from public leagues (consistent regardless of tab)
  const totalEntrants = tournamentPublicLeagues.reduce(
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
    // Default to 'private' if on private tab, otherwise 'public' (for my_leagues and public tabs)
    const defaultLeagueType = activeGameTab === 'private' ? 'private' : 'public';

    navigation.navigate('CreateLeague', {
      tournamentId: tournamentId,
      defaultLeagueType,
    });
  }, [activeGameTab, tournamentId, navigation]);

  const handleLeaguePress = (league: League) => {
    if (!league.id) return;

    const isPrivate = league.type === 'private';
    const isOwner = league.owner_id === currentUser?.id;
    const isMember = league.joined_players?.includes(currentUser?.id ?? '') ?? false;
    const isUserInLeague = isOwner || isMember;

    // Check if league has started
    const hasStarted = league.start_time ? new Date(league.start_time) <= new Date() : false;

    // If private league and user is not in it, show access denied message
    if (isPrivate && !isUserInLeague) {
      Alert.alert('Private League', 'Sorry you are not allowed to enter this private league.');
      return;
    }

    // If league has started, go directly to leaderboard
    if (hasStarted) {
      navigation.navigate('Leaderboard', { leagueId: league.id });
    } else {
      // League hasn't started yet, go to LeagueHome
      navigation.navigate('LeagueHome', { leagueId: league.id });
    }
  };

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
      }
      return false; // Let default behavior happen (exit app)
    });

    return () => backHandler.remove();
  }, [navigation]);

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
      title={currentTournament?.short_name || 'Tournament Leagues'}
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
            <TournamentBadges
              isLive={currentTournament?.is_live}
              isFinished={currentTournament?.is_finished}
              startsAt={currentTournament?.starts_at}
            />
            <HeaderOverlay>
              {currentTournament?.name && <TournamentName>{currentTournament.name}</TournamentName>}

              <GlobalStatsContainer>
                <StatItem>
                  <NumberOfLeagues>
                    <Icon name="👥" size={ICON_SIZES.HEADER} accessibilityLabel="Teams:" />{' '}
                    {totalEntrants} {totalEntrants === 1 ? 'Team' : 'Teams'}
                  </NumberOfLeagues>
                  <PrizePool>
                    <Icon name="💵" size={ICON_SIZES.HEADER} accessibilityLabel="Prize pool:" />{' '}
                    <PrizePoolAmount>
                      {formatCurrency(currentTournament?.total_staked, CURRENCY_FORMAT.HIDE_PENCE)}
                    </PrizePoolAmount>{' '}
                    Prize Pool
                  </PrizePool>
                </StatItem>
              </GlobalStatsContainer>
            </HeaderOverlay>
          </HeaderSection>
          <JoinLeagueList
            leagues={leagues}
            userPrivateLeagues={userPrivateLeagues}
            userLeagues={userLeagues}
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
