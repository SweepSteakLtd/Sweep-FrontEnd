import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-bottom: 4px;
`;

export const DropdownButton = styled.TouchableOpacity<{ hasError: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme, hasError }: { theme: Theme; hasError: boolean }) =>
    hasError ? theme.colors.error : theme.colors.border};
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const DropdownText = styled.Text<{ hasValue: boolean }>`
  font-size: 14px;
  color: ${({ theme, hasValue }: { theme: Theme; hasValue: boolean }) =>
    hasValue ? theme.colors.text.primary : theme.colors.text.secondary};
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  margin-top: 4px;
`;
