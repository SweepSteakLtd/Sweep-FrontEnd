import React from 'react';
import { Container, LogoImage } from './styles';

const pgaLogo = require('../../../../../assets/PGALogo1.png');

export const PGAHeader: React.FC = () => {
  return (
    <Container>
      <LogoImage source={pgaLogo} resizeMode="contain" />
    </Container>
  );
};

