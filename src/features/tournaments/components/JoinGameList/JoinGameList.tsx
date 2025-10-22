import { useState } from 'react';
import { View } from 'react-native';
import { SearchInput } from '~/components/SearchInput/SearchInput';
import { TabBar } from '~/components/TabBar/TabBar';
import { Game, GameCard } from '~/features/tournaments/components/GameCard/GameCard';
import { EmptyState, EmptyStateText, SearchAndTabsWrapper, SearchWrapper } from './styles';

interface JoinGameListProps {
  games: Game[];
  onGamePress?: (game: Game) => void;
}

const gameTabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
];

export const JoinGameList = ({ games, onGamePress }: JoinGameListProps) => {
  const [activeGameTab, setActiveGameTab] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = games.filter((game) => {
    // Filter by game tab (Featured/Public/Private)
    if (activeGameTab === 'featured' && !game.isFeatured) return false;
    if (activeGameTab === 'public' && game.isPrivate) return false;
    if (activeGameTab === 'private' && !game.isPrivate) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return game.name.toLowerCase().includes(query) || game.joinCode.toLowerCase().includes(query);
    }

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
          onTabPress={setActiveGameTab}
          variant="segmented"
        />
        {activeGameTab !== 'private' && (
          <SearchWrapper>
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search games..."
            />
          </SearchWrapper>
        )}
      </SearchAndTabsWrapper>

      {filteredGames.length === 0 ? (
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
