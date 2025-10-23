import { View } from 'react-native';
import { SearchInput } from '~/components/SearchInput/SearchInput';
import { TabBar } from '~/components/TabBar/TabBar';
import { GameCard } from '~/features/tournaments/components/GameCard/GameCard';
import { GameCardSkeleton } from '~/features/tournaments/components/GameCard/GameCardSkeleton';
import type { Game } from '~/services/apis/Game/types';
import { EmptyState, EmptyStateText, SearchAndTabsWrapper, SearchWrapper } from './styles';

interface JoinGameListProps {
  games: Game[];
  onGamePress?: (game: Game) => void;
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
  loading = false,
  searchQuery = '',
  onSearchChange,
  activeGameTab = 'featured',
  onGameTabChange,
}: JoinGameListProps) => {
  // Client-side filtering only by game tab, search is handled by API
  const filteredGames = games.filter((game) => {
    // Filter by game tab (Featured/Public/Private)
    if (activeGameTab === 'featured' && !game.is_featured) return false;
    if (activeGameTab === 'public' && game.type === 'private') return false;
    if (activeGameTab === 'private' && game.type !== 'private') return false;

    return true;
  });

  const handleGamePress = (game: Game) => {
    onGamePress?.(game);
  };

  return (
    <>
      {/* Search and Tabs in one section */}
      <SearchAndTabsWrapper>
        <TabBar
          tabs={gameTabs}
          activeTab={activeGameTab}
          onTabPress={onGameTabChange || (() => {})}
          loading={false}
        />
        <SearchWrapper style={{ opacity: activeGameTab === 'private' ? 0 : 1 }}>
          <SearchInput
            value={searchQuery}
            onChangeText={onSearchChange || (() => {})}
            placeholder="Search games..."
            editable={activeGameTab !== 'private'}
          />
        </SearchWrapper>
      </SearchAndTabsWrapper>

      {loading && filteredGames.length === 0 ? (
        <GameCardSkeleton />
      ) : filteredGames.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No games found</EmptyStateText>
        </EmptyState>
      ) : (
        <View>
          {filteredGames.map((item, index) => (
            <GameCard
              key={item.id}
              game={item}
              index={index}
              onPress={() => handleGamePress(item)}
            />
          ))}
        </View>
      )}
    </>
  );
};
