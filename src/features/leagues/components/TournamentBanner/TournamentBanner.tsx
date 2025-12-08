import React from 'react';
import { CoverCard } from '~/components/CoverCard/CoverCard';
import type { Tournament } from '~/services/apis/schemas';
import { Container } from './styles';

type TournamentBannerProps = {
  tournament?: Tournament;
};

export const TournamentBanner = ({ tournament }: TournamentBannerProps) => {
  if (!tournament) {
    return null;
  }

  return (
    <Container>
      <CoverCard
        imageUri={tournament.cover_picture}
        title={tournament.name || 'Tournament'}
        subtitle={tournament.description}
        height={180}
      />
    </Container>
  );
};
