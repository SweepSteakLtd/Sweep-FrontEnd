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
  SearchAndCreateRow,
  SearchAndTabsWrapper,
  SearchWrapper,
} from './styles';

interface JoinLeagueListProps {
  leagues: League[];
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
  // Client-side filtering only by league tab, search is handled by API
  const filteredLeagues = leagues.filter((league) => {
    // Filter by league tab (Featured/Public/Private)
    // Note: is_featured was removed from API, featured tab now shows all leagues
    // if (activeLeagueTab === 'featured' && !league.is_featured) return false;
    if (activeLeagueTab === 'public' && league.type === 'private') return false;
    if (activeLeagueTab === 'private' && league.type !== 'private') return false;

    return true;
  });

  // Sort leagues by status: live first, then upcoming, then finished
  const sortedLeagues = sortLeaguesByStatus(filteredLeagues);

  const handleLeaguePress = (league: League) => {
    onLeaguePress?.(league);
  };

  const handleLeagueDelete = (leagueId: string) => {
    onLeagueDelete?.(leagueId);
  };

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
            placeholder={
              activeLeagueTab === 'private' ? 'Search by name or join code...' : 'Search leagues...'
            }
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

      {loading && sortedLeagues.length === 0 ? (
        <LeagueCardSkeleton />
      ) : sortedLeagues.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No leagues found</EmptyStateText>
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
