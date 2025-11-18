import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Skeleton } from '~/components/Skeleton/Skeleton';
import { Container, ScrollContent } from './styles';

export const LeagueHomeSkeleton = () => {
  const theme = useTheme();

  return (
    <ScreenWrapper>
      <Container>
        <ScrollContent>
          {/* Header Skeleton */}
          <Skeleton.Item padding={20} backgroundColor={theme.colors.backgroundLight}>
            {/* League Name */}
            <Skeleton width="70%" height={28} borderRadius={4} style={{ marginBottom: 16 }} />

            {/* Info Row */}
            <Skeleton.Item flexDirection="row" justifyContent="space-around">
              {/* Participants */}
              <Skeleton.Item alignItems="center" flex={1}>
                <Skeleton width={48} height={48} borderRadius={24} style={{ marginBottom: 8 }} />
                <Skeleton width={80} height={12} borderRadius={4} style={{ marginBottom: 4 }} />
                <Skeleton width={60} height={18} borderRadius={4} />
              </Skeleton.Item>

              {/* Total Pot */}
              <Skeleton.Item alignItems="center" flex={1}>
                <Skeleton width={48} height={48} borderRadius={24} style={{ marginBottom: 8 }} />
                <Skeleton width={80} height={12} borderRadius={4} style={{ marginBottom: 4 }} />
                <Skeleton width={70} height={18} borderRadius={4} />
              </Skeleton.Item>
            </Skeleton.Item>
          </Skeleton.Item>

          {/* Tournament Banner Skeleton */}
          <Skeleton.Item
            marginHorizontal={16}
            marginTop={16}
            height={180}
            borderRadius={12}
            backgroundColor={theme.colors.backgroundLight}
          />

          {/* Buttons Skeleton */}
          <Skeleton.Item padding={16} gap={12}>
            <Skeleton height={48} borderRadius={8} />
            <Skeleton height={48} borderRadius={8} />
          </Skeleton.Item>

          {/* Time Section Skeleton */}
          <Skeleton.Item
            marginHorizontal={16}
            marginTop={16}
            padding={16}
            backgroundColor={theme.colors.backgroundLight}
            borderRadius={12}
          >
            {/* Start Time */}
            <Skeleton.Item flexDirection="row" alignItems="center" gap={12} marginBottom={12}>
              <Skeleton width={24} height={24} borderRadius={4} />
              <Skeleton.Item flex={1}>
                <Skeleton width={60} height={16} borderRadius={4} style={{ marginBottom: 4 }} />
                <Skeleton width="80%" height={14} borderRadius={4} />
              </Skeleton.Item>
            </Skeleton.Item>

            {/* End Time */}
            <Skeleton.Item flexDirection="row" alignItems="center" gap={12}>
              <Skeleton width={24} height={24} borderRadius={4} />
              <Skeleton.Item flex={1}>
                <Skeleton width={60} height={16} borderRadius={4} style={{ marginBottom: 4 }} />
                <Skeleton width="80%" height={14} borderRadius={4} />
              </Skeleton.Item>
            </Skeleton.Item>
          </Skeleton.Item>

          {/* Description Skeleton */}
          <Skeleton.Item padding={16}>
            <Skeleton width={100} height={12} borderRadius={4} style={{ marginBottom: 8 }} />
            <Skeleton width="100%" height={14} borderRadius={4} style={{ marginBottom: 6 }} />
            <Skeleton width="95%" height={14} borderRadius={4} style={{ marginBottom: 6 }} />
            <Skeleton width="80%" height={14} borderRadius={4} />
          </Skeleton.Item>
        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
};
