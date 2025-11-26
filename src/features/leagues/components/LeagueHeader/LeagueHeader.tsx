import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';
import { formatCurrency } from '~/utils/currency';
import { JoinCodeCard } from '../JoinCodeCard/JoinCodeCard';
import {
  CodeCardWrapper,
  Container,
  InfoIcon,
  InfoItem,
  InfoLabel,
  InfoRow,
  InfoValue,
  LeagueName,
} from './styles';

type LeagueHeaderProps = {
  leagueName?: string;
  currentEntries: number;
  maxEntries: number;
  totalPot: number;
  joinCode?: string;
  isOwner?: boolean;
};

export const LeagueHeader = ({
  leagueName,
  currentEntries,
  maxEntries,
  totalPot,
  joinCode,
  isOwner,
}: LeagueHeaderProps) => {
  const theme = useTheme();

  if (!leagueName) {
    return null;
  }

  return (
    <Container>
      <LeagueName>{leagueName}</LeagueName>
      {isOwner && joinCode && (
        <CodeCardWrapper>
          <JoinCodeCard
            joinCode={joinCode}
            leagueName={leagueName}
            label="Share this code to invite others:"
          />
        </CodeCardWrapper>
      )}
      <InfoRow>
        <InfoItem>
          <InfoIcon>
            <Typography variant="body" color={theme.colors.text.primary} style={{ fontSize: 24 }}>
              👥
            </Typography>
          </InfoIcon>
          <InfoLabel>ENTRIES</InfoLabel>
          <InfoValue>
            {currentEntries}/{maxEntries}
          </InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <Typography variant="body" color={theme.colors.text.primary} style={{ fontSize: 24 }}>
              🏆
            </Typography>
          </InfoIcon>
          <InfoLabel>TOTAL POT</InfoLabel>
          <InfoValue>{formatCurrency(totalPot)}</InfoValue>
        </InfoItem>
      </InfoRow>
    </Container>
  );
};
