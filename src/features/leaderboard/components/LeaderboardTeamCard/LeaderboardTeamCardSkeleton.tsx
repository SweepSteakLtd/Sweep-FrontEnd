import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Skeleton } from '~/components/Skeleton/Skeleton';

export const LeaderboardTeamCardSkeleton = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.backgroundLight,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        padding: 12,
      }}
    >
      <Skeleton.Item flexDirection="row" alignItems="center" gap={10}>
        {/* Rank Badge */}
        <Skeleton width={32} height={32} borderRadius={16} />

        {/* Team Info */}
        <Skeleton.Item flex={1}>
          <Skeleton width="70%" height={14} borderRadius={4} style={{ marginBottom: 4 }} />
          <Skeleton width="50%" height={11} borderRadius={4} />
        </Skeleton.Item>

        {/* Score Container */}
        <Skeleton.Item alignItems="flex-end">
          <Skeleton width={40} height={18} borderRadius={4} style={{ marginBottom: 4 }} />
          <Skeleton width={50} height={9} borderRadius={4} style={{ marginBottom: 2 }} />
          <Skeleton width={60} height={10} borderRadius={4} />
        </Skeleton.Item>

        {/* Expand Button */}
        <Skeleton.Item alignItems="center">
          <Skeleton width={12} height={10} borderRadius={2} />
        </Skeleton.Item>
      </Skeleton.Item>
    </View>
  );
};
