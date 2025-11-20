import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';
import { HowToEnterView } from '../HowToEnterView/HowToEnterView';
import { RulesView } from '../RulesView/RulesView';
import { Container, Header, SectionsContainer } from './styles';

interface HowToPlayProps {
  rules?: string[];
  instructions?: string[];
}

export const HowToPlay = ({ rules = [], instructions = [] }: HowToPlayProps) => {
  const theme = useTheme();

  if (rules.length === 0 && instructions.length === 0) {
    return null;
  }

  return (
    <Container>
      <Header>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Rules & Guidelines
        </Typography>
      </Header>

      <SectionsContainer>
        <RulesView rules={rules} />
        <HowToEnterView instructions={instructions} />
      </SectionsContainer>
    </Container>
  );
};
