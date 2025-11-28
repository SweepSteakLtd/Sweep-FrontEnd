import { ScrollView, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Skeleton } from '~/components/Skeleton/Skeleton';
import { LeaderboardTeamCardSkeleton } from '../../components/LeaderboardTeamCard/LeaderboardTeamCardSkeleton';
import { Container, SearchContainer } from './styles';

export const LeaderboardSkeleton = () => {
  const theme = useTheme();

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      >
        {/* Header Skeleton */}
        <Skeleton.Item marginTop={16} marginBottom={20}>
          {/* Tournament & League Name - centered */}
          <Skeleton.Item alignItems="center" marginBottom={20}>
            <Skeleton width={180} height={16} borderRadius={4} style={{ marginBottom: 4 }} />
            <Skeleton width={120} height={14} borderRadius={4} />
          </Skeleton.Item>

          {/* Stats Row */}
          <Skeleton.Item flexDirection="row" gap={12}>
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.backgroundLight,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
            >
              <Skeleton width={50} height={28} borderRadius={4} style={{ marginBottom: 4 }} />
              <Skeleton width={100} height={12} borderRadius={4} />
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: `${theme.colors.primary}20`,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
            >
              <Skeleton width={80} height={28} borderRadius={4} style={{ marginBottom: 4 }} />
              <Skeleton width={70} height={12} borderRadius={4} />
            </View>
          </Skeleton.Item>
        </Skeleton.Item>

        {/* Search Bar Skeleton */}
        <SearchContainer>
          <Skeleton width="100%" height={44} borderRadius={22} />
        </SearchContainer>

        {/* Leaderboard Cards Skeleton - Show 8 cards */}
        {[...Array(8)].map((_, index) => (
          <LeaderboardTeamCardSkeleton key={index} />
        ))}
      </ScrollView>
    </Container>
  );
};
