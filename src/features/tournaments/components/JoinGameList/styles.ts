import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const SearchAndTabsWrapper = styled.View`
  padding: 12px 40px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  gap: 12px;
`;

export const SearchWrapper = styled.View`
  padding: 10px 40px;
`;

export const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.textSecondary};
  text-align: center;
`;
