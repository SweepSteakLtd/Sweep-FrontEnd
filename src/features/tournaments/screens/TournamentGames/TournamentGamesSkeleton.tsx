import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { TabBar } from '~/components/TabBar/TabBar';
import { GameCardSkeleton } from '~/features/tournaments/components/GameCard/GameCardSkeleton';
import { SearchAndTabsWrapper } from '~/features/tournaments/components/JoinGameList/styles';
import { Container, PotInfo, PotLabel, SegmentedTabWrapper } from './styles';

interface TournamentGamesSkeletonProps {
  tournamentTabs?: { id: string; label: string }[];
  activeTournament?: string;
  onTabPress?: (id: string) => void;
}

const gameTabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
];

export const TournamentGamesSkeleton = ({
  tournamentTabs = [],
  activeTournament = '',
  onTabPress = () => {},
}: TournamentGamesSkeletonProps) => {
  const theme = useTheme();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tournament Tabs Loading */}
        <SegmentedTabWrapper>
          <TabBar
            tabs={tournamentTabs}
            activeTab={activeTournament}
            onTabPress={onTabPress}
            loading={true}
          />
        </SegmentedTabWrapper>

        <PotInfo>
          <PotLabel>Total Staked</PotLabel>
          <AnimatedAmount
            value={0}
            variant="title"
            color={theme.colors.text.secondary}
            align="center"
            weight="bold"
          />
        </PotInfo>

        {/* Nested Game Tabs Loading */}
        <SearchAndTabsWrapper>
          <TabBar tabs={gameTabs} activeTab="featured" onTabPress={() => {}} loading={true} />
        </SearchAndTabsWrapper>

        {/* Show 3 skeleton cards while loading */}
        {[...Array(3)].map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </ScrollView>
    </Container>
  );
};
