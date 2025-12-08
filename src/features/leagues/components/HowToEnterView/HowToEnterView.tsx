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

interface HowToEnterViewProps {
  instructions?: string[];
}

export const HowToEnterView = ({ instructions = [] }: HowToEnterViewProps) => {
  if (instructions.length === 0) {
    return null;
  }

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>🎮 How to Enter</SectionTitle>
      </SectionHeader>
      <ContentContainer>
        {instructions.map((item, index) => (
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
