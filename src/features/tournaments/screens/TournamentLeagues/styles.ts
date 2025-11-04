import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const PotInfo = styled.View`
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  align-items: center;
`;

export const PotLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;
