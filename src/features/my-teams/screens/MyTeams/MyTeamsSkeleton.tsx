import { ScrollView } from 'react-native';
import { Skeleton } from '~/components/Skeleton/Skeleton';
import { GameCardSkeleton } from '~/features/tournaments/components/GameCard/GameCardSkeleton';
import { Container, Header } from './styles';

export const MyTeamsSkeleton = () => {
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
      >
        {/* Header Skeleton */}
        <Header>
          {/* Balance Row */}
          <Skeleton.Item flexDirection="row" justifyContent="space-between" marginBottom={8}>
            <Skeleton width={120} height={16} borderRadius={4} />
            <Skeleton width={40} height={24} borderRadius={12} />
          </Skeleton.Item>

          <Skeleton.Item marginBottom={20}>
            <Skeleton width={100} height={28} borderRadius={4} />
          </Skeleton.Item>

          {/* Stats Row */}
          <Skeleton.Item flexDirection="row" justifyContent="space-around" marginTop={20}>
            {/* Teams Stat */}
            <Skeleton.Item alignItems="center">
              <Skeleton width={80} height={80} borderRadius={40} style={{ marginBottom: 8 }} />
              <Skeleton width={60} height={16} borderRadius={4} />
            </Skeleton.Item>

            {/* Leagues Made Stat */}
            <Skeleton.Item alignItems="center">
              <Skeleton width={80} height={80} borderRadius={40} style={{ marginBottom: 8 }} />
              <Skeleton width={80} height={16} borderRadius={4} />
            </Skeleton.Item>
          </Skeleton.Item>
        </Header>

        {/* Section Title Skeleton */}
        <Skeleton.Item marginHorizontal={16} marginBottom={12}>
          <Skeleton width={100} height={24} borderRadius={4} />
        </Skeleton.Item>

        {/* Team Cards Skeleton - Show 3 cards */}
        {[...Array(3)].map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </ScrollView>
    </Container>
  );
};
