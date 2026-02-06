import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
`;
