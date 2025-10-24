import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { Typography } from '../Typography/Typography';

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const CurrencyWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

interface CurrencyPrefixProps {
  isFocused: boolean;
  hasError: boolean;
}

export const CurrencyPrefix = styled.View<CurrencyPrefixProps>`
  position: absolute;
  left: 16px;
  z-index: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.input.background};
  padding-vertical: 4px;
`;

interface StyledInputProps {
  isFocused: boolean;
  hasError: boolean;
  hasCurrency?: boolean;
  disabled?: boolean;
}

export const StyledInput = styled.TextInput.attrs(({ theme }: { theme: Theme }) => ({
  placeholderTextColor: theme.colors.text.placeholder,
}))<StyledInputProps>`
  flex: 1;
  background-color: ${({ theme, disabled }: { theme: Theme; disabled?: boolean }) =>
    disabled ? theme.colors.backgroundLight : theme.colors.input.background};
  color: ${({ theme, disabled }: { theme: Theme; disabled?: boolean }) =>
    disabled ? theme.colors.text.secondary : theme.colors.input.text};
  padding: 12px 16px;
  padding-left: ${({ hasCurrency }: { hasCurrency?: boolean }) => (hasCurrency ? '36px' : '16px')};
  border-radius: 8px;
  font-size: 14px;
  border-width: 1px;
  border-color: ${({
    theme,
    hasError,
    isFocused,
    disabled,
  }: {
    theme: Theme;
    hasError: boolean;
    isFocused: boolean;
    disabled?: boolean;
  }) => {
    if (disabled) return theme.colors.border;
    if (hasError) return theme.colors.error;
    return isFocused ? theme.colors.primary : theme.colors.border;
  }};
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.6 : 1)};
`;

export const ErrorText = styled(Typography)`
  margin-top: 4px;
`;
