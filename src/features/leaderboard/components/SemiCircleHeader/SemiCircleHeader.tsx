import React from 'react';
import { Container, LogoImage } from './styles';

const openChampsLogo = require('../../../../../assets/OpenChampsLogo.jpg');

export const SemiCircleHeader: React.FC = () => {
  return (
    <Container>
      <LogoImage source={openChampsLogo} resizeMode="contain" />
    </Container>
  );
};

