import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { TabBar } from '~/components/TabBar/TabBar';
import { SearchAndTabsWrapper } from '~/features/tournaments/components/JoinLeagueList/styles';
import { LeagueCardSkeleton } from '~/features/tournaments/components/LeagueCard/LeagueCardSkeleton';
import { Container, PotInfo, PotLabel } from './styles';

const gameTabs = [
  { id: 'featured', label: 'Featured' },
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' },
];

export const TournamentLeaguesSkeleton = () => {
  const theme = useTheme();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <LeagueCardSkeleton key={index} />
        ))}
      </ScrollView>
    </Container>
  );
};
