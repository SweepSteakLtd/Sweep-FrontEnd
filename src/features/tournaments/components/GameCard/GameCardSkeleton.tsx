import { useTheme } from 'styled-components/native';
import { Skeleton } from '~/components/Skeleton/Skeleton';

export const GameCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Skeleton.Item
      marginHorizontal={16}
      marginBottom={12}
      padding={20}
      backgroundColor={theme.colors.backgroundLight}
      borderRadius={12}
    >
      <Skeleton.Item flexDirection="row" justifyContent="space-between">
        {/* Left section */}
        <Skeleton.Item flex={1} marginRight={16}>
          <Skeleton width="80%" height={20} borderRadius={4} />
          <Skeleton width="60%" height={16} borderRadius={4} style={{ marginTop: 8 }} />
        </Skeleton.Item>

        {/* Right section */}
        <Skeleton.Item alignItems="flex-end">
          <Skeleton width={80} height={16} borderRadius={4} />
          <Skeleton width={100} height={20} borderRadius={4} style={{ marginTop: 8 }} />
        </Skeleton.Item>
      </Skeleton.Item>
    </Skeleton.Item>
  );
};
