import React from 'react';
import { Container, SkeletonAvatar, SkeletonLine, SkeletonOdds, SkeletonText } from './styles';

export const PlayerListItemSkeleton: React.FC = () => {
  return (
    <Container>
      <SkeletonAvatar />
      <SkeletonText>
        <SkeletonLine width={120} />
        <SkeletonLine width={80} style={{ marginTop: 6 }} />
      </SkeletonText>
      <SkeletonOdds />
    </Container>
  );
};
