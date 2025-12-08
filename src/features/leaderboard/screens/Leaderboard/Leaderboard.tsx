import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
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
import { getEntryId, useLeaderboard } from './useLeaderboard';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Leaderboard = () => {
  const theme = useTheme();
  const route = useRoute<RootStackScreenProps<'Leaderboard'>['route']>();
  const { leagueId } = route.params;
  const [openSwipeableId, setOpenSwipeableId] = useState<string | null>(null);

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
    togglePin,
    isPinned,
  } = useLeaderboard(leagueId);

  const renderTeamCard = useCallback(
    ({ item, index }: { item: LeaderboardEntry; index: number }) => {
      const entryId = getEntryId(item);
      const isEntryPinned = isPinned(entryId);
      const isOwnTeam = isCurrentUserEntry(item);

      return (
        <CardWrapper>
          <LeaderboardTeamCard
            entry={item}
            entryId={entryId}
            isTopThree={tournamentStarted && item.rank <= 3}
            isFirst={index === 0}
            isLast={index === filteredEntries.length - 1}
            isCurrentUser={isOwnTeam}
            currentUserNickname={currentUserNickname}
            canExpand={tournamentStarted}
            isPinned={isEntryPinned}
            canPin={!isOwnTeam}
            onTogglePin={() => togglePin(entryId)}
            openSwipeableId={openSwipeableId}
            onSwipeableOpen={setOpenSwipeableId}
          />
        </CardWrapper>
      );
    },
    [
      filteredEntries.length,
      isCurrentUserEntry,
      currentUserNickname,
      tournamentStarted,
      isPinned,
      togglePin,
      openSwipeableId,
    ],
  );

  const keyExtractor = useCallback((item: LeaderboardEntry) => getEntryId(item), []);

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
