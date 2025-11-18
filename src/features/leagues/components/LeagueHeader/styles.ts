import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const LeagueName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 8px;
`;

export const InfoItem = styled.View`
  align-items: center;
  flex: 1;
`;

export const InfoIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const InfoLabel = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-bottom: 4px;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;
