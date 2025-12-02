import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { PlusIcon } from '~/components/Icon/PlusIcon';
import { SearchInput } from '~/components/SearchInput/SearchInput';
import { TabBar } from '~/components/TabBar/TabBar';
import { LeagueCard } from '~/features/tournaments/components/LeagueCard/LeagueCard';
import { LeagueCardSkeleton } from '~/features/tournaments/components/LeagueCard/LeagueCardSkeleton';
import type { League } from '~/services/apis/League/types';
import { sortLeaguesByStatus } from '~/utils/leagueStatus';

import {
  EmptyState,
  EmptyStateText,
  JoinCodeContainer,
  JoinCodeDescription,
  JoinCodeTitle,
  SearchAndCreateRow,
  SearchAndTabsWrapper,
  SearchWrapper,
} from './styles';

interface JoinLeagueListProps {
  leagues: League[];
  userPrivateLeagues?: League[];
  onLeaguePress?: (league: League) => void;
  onLeagueDelete?: (leagueId: string) => void;
  onCreateLeague?: () => void;
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeLeagueTab?: string;
  onLeagueTabChange?: (tab: string) => void;
}

const leagueTabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
];

export const JoinLeagueList = ({
  leagues,
  userPrivateLeagues = [],
  onLeaguePress,
  onLeagueDelete,
  onCreateLeague,
  loading = false,
  searchQuery = '',
  onSearchChange,
  activeLeagueTab = 'featured',
  onLeagueTabChange,
}: JoinLeagueListProps) => {
  const theme = useTheme();

  const isPrivateTab = activeLeagueTab === 'private';
  const isSearching = searchQuery.trim().length > 0;

  // Filter leagues based on tab
  const filteredLeagues = (() => {
    if (isPrivateTab) {
      if (isSearching) {
        // When searching, show private leagues from search results
        return leagues.filter((league) => league.type === 'private');
      }
      // When not searching, show user's private leagues
      return userPrivateLeagues;
    }
    // Featured/Public tabs: never show private leagues
    return leagues.filter((league) => league.type !== 'private');
  })();

  // Sort leagues by status: live first, then upcoming, then finished
  const sortedLeagues = sortLeaguesByStatus(filteredLeagues);

  const handleLeaguePress = (league: League) => {
    onLeaguePress?.(league);
  };

  const handleLeagueDelete = (leagueId: string) => {
    onLeagueDelete?.(leagueId);
  };

  // For private tab: show prompt when no search and no user leagues
  const showPrivateEmptyState = isPrivateTab && !isSearching && userPrivateLeagues.length === 0;

  return (
    <>
      {/* Tabs with more padding */}
      <SearchAndTabsWrapper>
        <TabBar
          tabs={leagueTabs}
          activeTab={activeLeagueTab}
          onTabPress={onLeagueTabChange || (() => {})}
          loading={false}
        />
      </SearchAndTabsWrapper>

      {/* Search and Create row aligned with list items */}
      <SearchAndCreateRow>
        <SearchWrapper>
          <SearchInput
            value={searchQuery}
            onChangeText={onSearchChange || (() => {})}
            placeholder={isPrivateTab ? 'Search private leagues by name...' : 'Search leagues...'}
          />
        </SearchWrapper>
        {onCreateLeague && (
          <Button
            icon={<PlusIcon size={24} color="white" />}
            onPress={onCreateLeague}
            fullWidth={false}
            backgroundColor={theme.colors.primary}
          />
        )}
      </SearchAndCreateRow>

      {/* Private tab: show prompt when not searching and no user leagues */}
      {showPrivateEmptyState ? (
        <JoinCodeContainer>
          <JoinCodeTitle>Find a Private League</JoinCodeTitle>
          <JoinCodeDescription>
            Search for private leagues by name. Once you find a league, you'll need the join code
            from the organiser to enter.
          </JoinCodeDescription>
        </JoinCodeContainer>
      ) : loading && sortedLeagues.length === 0 ? (
        <LeagueCardSkeleton />
      ) : sortedLeagues.length === 0 ? (
        <EmptyState>
          <EmptyStateText>
            {isPrivateTab ? 'No private leagues found' : 'No leagues found'}
          </EmptyStateText>
        </EmptyState>
      ) : (
        <View>
          {sortedLeagues.map((item, index) => (
            <LeagueCard
              key={item.id}
              league={item}
              index={index}
              onPress={() => handleLeaguePress(item)}
              onDelete={onLeagueDelete ? handleLeagueDelete : undefined}
            />
          ))}
        </View>
      )}
    </>
  );
};
