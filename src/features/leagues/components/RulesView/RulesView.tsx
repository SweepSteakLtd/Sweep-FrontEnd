import React from 'react';
import {
  Container,
  ContentContainer,
  ItemText,
  ListItem,
  NumberBadge,
  NumberText,
  SectionHeader,
  SectionTitle,
} from '../shared/ListViewStyles';

interface RulesViewProps {
  rules?: string[];
}

export const RulesView = ({ rules = [] }: RulesViewProps) => {
  if (rules.length === 0) {
    return null;
  }

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>📋 Rules</SectionTitle>
      </SectionHeader>
      <ContentContainer>
        {rules.map((item, index) => (
          <ListItem key={index}>
            <NumberBadge>
              <NumberText>{index + 1}</NumberText>
            </NumberBadge>
            <ItemText>{item}</ItemText>
          </ListItem>
        ))}
      </ContentContainer>
    </Container>
  );
};
