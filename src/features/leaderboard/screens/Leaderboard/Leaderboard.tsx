import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { LayoutAnimation, Platform, RefreshControl, UIManager } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackScreenProps } from '~/navigation/types';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { useGetLeaderboard } from '~/services/apis/Leaderboard/useGetLeaderboard';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { LeaderboardHeader } from '../../components/LeaderboardHeader/LeaderboardHeader';
import { LeaderboardTeamCard } from '../../components/LeaderboardTeamCard/LeaderboardTeamCard';
import { LeaderboardSkeleton } from './LeaderboardSkeleton';
import { CardWrapper, Container, SearchContainer, SearchInput } from './styles';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const POLL_INTERVAL = 5000; // 5 seconds

export const Leaderboard = () => {
  const theme = useTheme();
  const route = useRoute<RootStackScreenProps<'Leaderboard'>['route']>();
  const { leagueId } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    refetch,
    isRefetching,
  } = useGetLeaderboard(leagueId, { refetchInterval: POLL_INTERVAL });

  const { data: leagueData, isLoading: isLeagueLoading } = useGetLeague(leagueId);
  const { data: tournaments } = useGetTournaments();
  const { data: currentUser } = useGetUser();

  const league = leagueData?.league;
  const tournament = tournaments?.find((t) => t.id === league?.tournament_id);

  // Build current user's full name to match against leaderboard entries
  const currentUserFullName = useMemo(() => {
    if (!currentUser?.first_name || !currentUser?.last_name) return null;
    return `${currentUser.first_name} ${currentUser.last_name}`;
  }, [currentUser?.first_name, currentUser?.last_name]);

  // Helper to check if an entry belongs to current user (by matching full name)
  const isCurrentUserEntry = useCallback(
    (entry: LeaderboardEntry) => {
      if (!currentUserFullName) return false;
      return entry.name.substring.toLowerCase() === currentUserFullName.toLowerCase();
    },
    [currentUserFullName],
  );

  const entries = leaderboardData?.data ?? [];
  const isLoading = isLeaderboardLoading || isLeagueLoading;

  // Sort entries: current user's teams first, then by rank
  const sortedEntries = useMemo(() => {
    if (!currentUserFullName) return entries;

    const userTeams = entries.filter(isCurrentUserEntry);
    const otherTeams = entries.filter((entry) => !isCurrentUserEntry(entry));

    return [...userTeams, ...otherTeams];
  }, [entries, currentUserFullName, isCurrentUserEntry]);

  const filteredEntries = searchQuery
    ? sortedEntries.filter(
        (entry) =>
          entry.name.main.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.name.substring.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.players.some((p) =>
            p.player_name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : sortedEntries;

  const onRefresh = useCallback(async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    await refetch();
  }, [refetch]);

  const currentUserNickname = currentUser?.nickname;

  const renderTeamCard = useCallback(
    ({ item, index }: { item: LeaderboardEntry; index: number }) => (
      <CardWrapper>
        <LeaderboardTeamCard
          entry={item}
          isTopThree={item.rank <= 3}
          isFirst={index === 0}
          isLast={index === filteredEntries.length - 1}
          isCurrentUser={isCurrentUserEntry(item)}
          currentUserNickname={currentUserNickname}
        />
      </CardWrapper>
    ),
    [filteredEntries.length, isCurrentUserEntry, currentUserNickname],
  );

  const keyExtractor = useCallback(
    (item: LeaderboardEntry) => `${item.rank}-${item.name.main}`,
    [],
  );

  const ListHeader = (
    <>
      <LeaderboardHeader
        tournamentName={tournament?.name}
        leagueName={league?.name}
        totalPot={
          (leagueData?.total_pot ?? Math.floor((league?.entry_fee ?? 0) * entries.length * 0.9)) /
          100
        }
        totalTeams={entries.length || leagueData?.total_team_count || 0}
        coverPhoto={tournament?.cover_picture}
      />
      <SearchContainer>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search teams or players..."
          placeholderTextColor={theme.colors.text.secondary}
        />
      </SearchContainer>
    </>
  );

  if (isLoading) {
    return (
      <ScreenWrapper title="Leader Board">
        <LeaderboardSkeleton />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Leader Board">
      <Container>
        <Animated.FlatList
          data={filteredEntries}
          renderItem={renderTeamCard}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      </Container>
    </ScreenWrapper>
  );
};
