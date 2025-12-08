import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const SearchContainer = styled.View`
  margin-bottom: 12px;
  padding-horizontal: 16px;
`;

export const CardWrapper = styled.View`
  padding-horizontal: 16px;
`;

export const SearchInput = styled.TextInput`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;
