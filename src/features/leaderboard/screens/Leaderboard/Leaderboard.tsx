import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Platform, RefreshControl, UIManager } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import type { TournamentStackScreenProps } from '~/navigation/types';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { LeaderboardHeader } from '../../components/LeaderboardHeader/LeaderboardHeader';
import { LeaderboardTeamCard } from '../../components/LeaderboardTeamCard/LeaderboardTeamCard';
import { MastersColumnHeader } from '../../components/MastersColumnHeader/MastersColumnHeader';
import { MastersHeader } from '../../components/MastersHeader/MastersHeader';
import { PGAHeader } from '../../components/PGAHeader/PGAHeader';
import { SemiCircleHeader } from '../../components/SemiCircleHeader/SemiCircleHeader';
import { LeaderboardSkeleton } from './LeaderboardSkeleton';
import {
  CardWrapper,
  Container,
  LeaderboardWrapperClose,
  LeaderboardWrapperOpen,
  SearchContainer,
  SearchInput,
} from './styles';
import { getEntryId, useLeaderboard } from './useLeaderboard';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Leaderboard = () => {
  const theme = useTheme();
  const { tournamentTheme } = useTournamentTheme();
  const route = useRoute<TournamentStackScreenProps<'Leaderboard'>['route']>();
  const { leagueId } = route.params;
  const [openSwipeableId, setOpenSwipeableId] = useState<string | null>(null);

  const {
    league,
    tournament,
    filteredEntries,
    totalPot,
    totalTeams,
    currentUserNickname,
    round,
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

  const keyExtractor = useCallback((item: LeaderboardEntry) => getEntryId(item), []);

  // Check if this is The Open tournament
  const isOpenTournament = tournament?.name?.toLowerCase().includes('open') ?? false;
  // Check if this is The Masters tournament
  const isMastersTournament = tournament?.name?.toLowerCase().includes('masters') ?? false;
  // Check if this is a PGA tournament
  const isPGATournament = tournament?.name?.toLowerCase().includes('pga') ?? false;

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
      {isOpenTournament && <SemiCircleHeader />}
      {isMastersTournament && <MastersHeader />}
      {isPGATournament && <PGAHeader />}
      <MastersColumnHeader primaryColor={tournamentTheme.primary} round={round} />
    </>
  );

  if (isLoading) {
    return (
      <ScreenWrapper title="Leaderboard">
        <LeaderboardSkeleton />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      title="Leaderboard"
      headerBackgroundColor={tournamentTheme.primary}
      contentBackgroundColor={'white'}
    >
      <Container>
        <Animated.FlatList
          data={filteredEntries}
          renderItem={({ item, index }) => {
            const entryId = getEntryId(item);
            const isEntryPinned = isPinned(entryId);
            const isOwnTeam = isCurrentUserEntry(item);
            const isFirst = index === 0;
            const isLast = index === filteredEntries.length - 1;

            return (
              <>
                {isFirst && isOpenTournament && <LeaderboardWrapperOpen />}
                <CardWrapper
                  isOpenTournament={isOpenTournament}
                  isMastersTournament={isMastersTournament}
                  isPGATournament={isPGATournament}
                >
                  <LeaderboardTeamCard
                    entry={item}
                    entryId={entryId}
                    isTopThree={tournamentStarted && item.rank <= 3}
                    isFirst={isFirst}
                    isLast={isLast}
                    isCurrentUser={isOwnTeam}
                    currentUserNickname={currentUserNickname}
                    canExpand={tournamentStarted}
                    isPinned={isEntryPinned}
                    canPin={!isOwnTeam}
                    onTogglePin={() => togglePin(entryId)}
                    openSwipeableId={openSwipeableId}
                    onSwipeableOpen={setOpenSwipeableId}
                    isOpenTournament={isOpenTournament}
                    isMastersTournament={isMastersTournament}
                    isPGATournament={isPGATournament}
                  />
                </CardWrapper>
                {isLast && isOpenTournament && <LeaderboardWrapperClose />}
              </>
            );
          }}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={'red'} />
          }
        />
      </Container>
    </ScreenWrapper>
  );
};
