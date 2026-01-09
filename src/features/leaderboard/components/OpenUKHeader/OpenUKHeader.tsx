import React from 'react';
import { Container, LogoImage } from './styles';

const openChampsLogo = require('~/assets/images/tournaments/OpenChampsLogo.jpg');

export const OpenUKHeader: React.FC = () => {
  return (
    <Container>
      <LogoImage source={openChampsLogo} resizeMode="contain" />
    </Container>
  );
};


