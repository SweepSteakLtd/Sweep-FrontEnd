import React from 'react';
import { Container, LogoImage } from './styles';

const mastersLogo = require('../../../../../assets/MastersLogo1.png');

export const MastersHeader: React.FC = () => {
  return (
    <Container>
      <LogoImage source={mastersLogo} resizeMode="contain" />
    </Container>
  );
};

