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
  yourEntries: number;
  totalTeams: number;
  totalPot: number;
  joinCode?: string;
  isOwner?: boolean;
};

export const LeagueHeader = ({
  leagueName,
  yourEntries,
  totalTeams,
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
          <JoinCodeCard joinCode={joinCode} leagueName={leagueName} />
        </CodeCardWrapper>
      )}
      <InfoRow>
        <InfoItem>
          <InfoIcon>
            <Typography variant="body" color={theme.colors.text.primary} style={{ fontSize: 24 }}>
              📝
            </Typography>
          </InfoIcon>
          <InfoLabel>YOUR ENTRIES</InfoLabel>
          <InfoValue>{yourEntries}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <Typography variant="body" color={theme.colors.text.primary} style={{ fontSize: 24 }}>
              👥
            </Typography>
          </InfoIcon>
          <InfoLabel>TEAMS</InfoLabel>
          <InfoValue>{totalTeams}</InfoValue>
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
