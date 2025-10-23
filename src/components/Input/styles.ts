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
  theme: Theme;
  isFocused: boolean;
  hasError: boolean;
}

export const CurrencyPrefix = styled.View<CurrencyPrefixProps>`
  position: absolute;
  left: 16px;
  z-index: 1;
  background-color: ${(props: CurrencyPrefixProps) => props.theme.colors.input.background};
  padding-vertical: 4px;
`;

interface StyledInputProps {
  theme: Theme;
  isFocused: boolean;
  hasError: boolean;
  hasCurrency?: boolean;
}

export const StyledInput = styled.TextInput.attrs((props: { theme: Theme }) => ({
  placeholderTextColor: props.theme.colors.text.placeholder,
}))<StyledInputProps>`
  flex: 1;
  background-color: ${(props: StyledInputProps) => props.theme.colors.input.background};
  color: ${(props: StyledInputProps) => props.theme.colors.input.text};
  padding: 12px 16px;
  padding-left: ${(props: StyledInputProps) => (props.hasCurrency ? '36px' : '16px')};
  border-radius: 8px;
  font-size: 14px;
  border-width: 1px;
  border-color: ${(props: StyledInputProps) => {
    if (props.hasError) return props.theme.colors.error;
    return props.isFocused ? props.theme.colors.primary : props.theme.colors.border;
  }};
`;

export const ErrorText = styled(Typography)`
  margin-top: 4px;
`;
