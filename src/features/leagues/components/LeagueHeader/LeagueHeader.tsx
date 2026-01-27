import React from 'react';
import { Icon } from '~/components/Icon/Icon';
import { CURRENCY_FORMAT, ICON_SIZES } from '~/constants/ui';
import { formatCurrency } from '~/utils/currency';
import { JoinCodeCard } from '../JoinCodeCard/JoinCodeCard';
import {
  CodeCardWrapper,
  Container,
  LeagueName,
  NumberOfTeams,
  PrizePool,
  PrizePoolAmount,
  StatItem,
  StatsRow,
} from './styles';

type LeagueHeaderProps = {
  leagueName?: string;
  totalTeams: number;
  totalPot: number;
  joinCode?: string;
  isOwner?: boolean;
};

export const LeagueHeader = ({
  leagueName,
  totalTeams,
  totalPot,
  joinCode,
  isOwner,
}: LeagueHeaderProps) => {
  if (!leagueName) {
    return null;
  }

  return (
    <Container>
      <LeagueName>{leagueName}</LeagueName>
      {isOwner && joinCode && (
        <CodeCardWrapper>
          <JoinCodeCard joinCode={joinCode} leagueName={leagueName} />
        </CodeCardWrapper>
      )}
      <StatsRow>
        <StatItem>
          <NumberOfTeams>
            <Icon name="👥" size={ICON_SIZES.HEADER} accessibilityLabel="Teams:" /> {totalTeams}{' '}
            {totalTeams === 1 ? 'Team' : 'Teams'}
          </NumberOfTeams>
          <PrizePool>
            <Icon name="💵" size={ICON_SIZES.HEADER} accessibilityLabel="Prize pool:" />{' '}
            <PrizePoolAmount>
              {formatCurrency(totalPot, CURRENCY_FORMAT.HIDE_PENCE)}
            </PrizePoolAmount>{' '}
            Prize Pool
          </PrizePool>
        </StatItem>
      </StatsRow>
    </Container>
  );
};
