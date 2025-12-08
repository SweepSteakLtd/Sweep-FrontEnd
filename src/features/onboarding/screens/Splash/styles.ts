import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
`;
