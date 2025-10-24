import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const SearchAndTabsWrapper = styled.View`
  padding: 12px 40px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const SearchAndCreateRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 24px 16px 12px 16px;
`;

export const SearchWrapper = styled.View`
  flex: 1;
`;

export const CreateButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
`;

export const CreateButtonText = styled.Text`
  font-size: 28px;
  font-weight: 300;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  line-height: 28px;
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
