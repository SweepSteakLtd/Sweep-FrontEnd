import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { PlusIcon } from '~/components/Icon/PlusIcon';
import { SearchInput } from '~/components/SearchInput/SearchInput';
import { TabBar } from '~/components/TabBar/TabBar';
import { GameCard } from '~/features/tournaments/components/GameCard/GameCard';
import { GameCardSkeleton } from '~/features/tournaments/components/GameCard/GameCardSkeleton';
import type { League } from '~/services/apis/League/types';
import { sortLeaguesByStatus } from '~/utils/leagueStatus';

import {
  EmptyState,
  EmptyStateText,
  SearchAndCreateRow,
  SearchAndTabsWrapper,
  SearchWrapper,
} from './styles';

interface JoinGameListProps {
  games: League[];
  onGamePress?: (game: League) => void;
  onGameDelete?: (gameId: string) => void;
  onCreateGame?: () => void;
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeGameTab?: string;
  onGameTabChange?: (tab: string) => void;
}

const gameTabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
];

export const JoinGameList = ({
  games,
  onGamePress,
  onGameDelete,
  onCreateGame,
  loading = false,
  searchQuery = '',
  onSearchChange,
  activeGameTab = 'featured',
  onGameTabChange,
}: JoinGameListProps) => {
  const theme = useTheme();
  // Client-side filtering only by game tab, search is handled by API
  const filteredGames = games.filter((game) => {
    // Filter by game tab (Featured/Public/Private)
    // Note: is_featured was removed from API, featured tab now shows all games
    // if (activeGameTab === 'featured' && !game.is_featured) return false;
    if (activeGameTab === 'public' && game.type === 'private') return false;
    if (activeGameTab === 'private' && game.type !== 'private') return false;

    return true;
  });

  // Sort leagues by status: live first, then upcoming, then finished
  const sortedGames = sortLeaguesByStatus(filteredGames);

  const handleGamePress = (game: League) => {
    onGamePress?.(game);
  };

  const handleGameDelete = (gameId: string) => {
    onGameDelete?.(gameId);
  };

  return (
    <>
      {/* Tabs with more padding */}
      <SearchAndTabsWrapper>
        <TabBar
          tabs={gameTabs}
          activeTab={activeGameTab}
          onTabPress={onGameTabChange || (() => {})}
          loading={false}
        />
      </SearchAndTabsWrapper>

      {/* Search and Create row aligned with list items */}
      <SearchAndCreateRow>
        <SearchWrapper style={{ opacity: activeGameTab === 'private' ? 0 : 1 }}>
          <SearchInput
            value={searchQuery}
            onChangeText={onSearchChange || (() => {})}
            placeholder="Search games..."
            editable={activeGameTab !== 'private'}
          />
        </SearchWrapper>
        {onCreateGame && (
          <Button
            icon={<PlusIcon size={24} color="white" />}
            onPress={onCreateGame}
            fullWidth={false}
            backgroundColor={theme.colors.primary}
          />
        )}
      </SearchAndCreateRow>

      {loading && sortedGames.length === 0 ? (
        <GameCardSkeleton />
      ) : sortedGames.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No games found</EmptyStateText>
        </EmptyState>
      ) : (
        <View>
          {sortedGames.map((item, index) => (
            <GameCard
              key={item.id}
              game={item}
              index={index}
              onPress={() => handleGamePress(item)}
              onDelete={onGameDelete ? handleGameDelete : undefined}
            />
          ))}
        </View>
      )}
    </>
  );
};
