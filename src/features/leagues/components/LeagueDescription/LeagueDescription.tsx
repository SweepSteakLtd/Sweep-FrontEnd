import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';
import { Container } from './styles';

type LeagueDescriptionProps = {
  description?: string;
};

export const LeagueDescription = ({ description }: LeagueDescriptionProps) => {
  const theme = useTheme();

  if (!description) {
    return null;
  }

  return (
    <Container>
      <Typography variant="label" color={theme.colors.text.tertiary} style={{ marginBottom: 8 }}>
        DESCRIPTION
      </Typography>
      <Typography variant="body" color={theme.colors.text.primary}>
        {description}
      </Typography>
    </Container>
  );
};
