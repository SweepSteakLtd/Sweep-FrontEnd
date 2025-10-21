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
  gap: 20px;
`;

export const GoldCircle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
`;

export const AppName = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  margin-top: 20px;
`;
