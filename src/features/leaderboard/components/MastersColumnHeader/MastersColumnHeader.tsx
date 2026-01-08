import React from 'react';
import { Container, HeaderRow, NameText, RoundBox, RoundText, ScoreText } from './styles';

interface MastersColumnHeaderProps {
  primaryColor?: string;
  round?: string;
}

export const MastersColumnHeader: React.FC<MastersColumnHeaderProps> = ({
  primaryColor,
  round,
}) => {
  return (
    <Container primaryColor={primaryColor}>
      <HeaderRow>
        <NameText>Name</NameText>
        <RoundBox>
          <RoundText primaryColor={primaryColor}>{round || '1/4'}</RoundText>
        </RoundBox>
        <ScoreText>Score</ScoreText>
      </HeaderRow>
    </Container>
  );
};
