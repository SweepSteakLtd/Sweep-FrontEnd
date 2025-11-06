import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const TournamentGrid = styled.View`
  flex: 1;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
`;
