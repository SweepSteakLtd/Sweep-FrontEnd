import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Platform, RefreshControl, UIManager } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackScreenProps } from '~/navigation/types';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { LeaderboardHeader } from '../../components/LeaderboardHeader/LeaderboardHeader';
import { LeaderboardTeamCard } from '../../components/LeaderboardTeamCard/LeaderboardTeamCard';
import { LeaderboardSkeleton } from './LeaderboardSkeleton';
import { CardWrapper, Container, SearchContainer, SearchInput } from './styles';
import { useLeaderboard } from './useLeaderboard';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Leaderboard = () => {
  const theme = useTheme();
  const route = useRoute<RootStackScreenProps<'Leaderboard'>['route']>();
  const { leagueId } = route.params;

  const {
    league,
    tournament,
    filteredEntries,
    totalPot,
    totalTeams,
    currentUserNickname,
    searchQuery,
    setSearchQuery,
    tournamentStarted,
    isLoading,
    isRefetching,
    isCurrentUserEntry,
    onRefresh,
  } = useLeaderboard(leagueId);

  const renderTeamCard = useCallback(
    ({ item, index }: { item: LeaderboardEntry; index: number }) => (
      <CardWrapper>
        <LeaderboardTeamCard
          entry={item}
          isTopThree={tournamentStarted && item.rank <= 3}
          isFirst={index === 0}
          isLast={index === filteredEntries.length - 1}
          isCurrentUser={isCurrentUserEntry(item)}
          currentUserNickname={currentUserNickname}
          canExpand={tournamentStarted}
        />
      </CardWrapper>
    ),
    [filteredEntries.length, isCurrentUserEntry, currentUserNickname, tournamentStarted],
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
        totalPot={totalPot}
        totalTeams={totalTeams}
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
