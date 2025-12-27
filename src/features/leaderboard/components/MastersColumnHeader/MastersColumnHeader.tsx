import React from 'react';
import { Container, HeaderRow, RoundBox, RoundText, NameText, ScoreText } from './styles';

interface MastersColumnHeaderProps {
  primaryColor?: string;
}

export const MastersColumnHeader: React.FC<MastersColumnHeaderProps> = ({ primaryColor }) => {
  return (
    <Container primaryColor={primaryColor}>
      <HeaderRow>
        <NameText>Name</NameText>
        <RoundBox>
          <RoundText primaryColor={primaryColor}>Round 1/4</RoundText>
        </RoundBox>
        <ScoreText>Score</ScoreText>
      </HeaderRow>
    </Container>
  );
};

