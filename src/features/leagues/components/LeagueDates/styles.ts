import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const TimeLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const TimeValue = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
