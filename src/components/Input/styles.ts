import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { Typography } from '../Typography/Typography';

export const Container = styled.View`
  margin-bottom: 15px;
`;

interface StyledInputProps {
  theme: Theme;
  isFocused: boolean;
  hasError: boolean;
}

export const StyledInput = styled.TextInput.attrs((props: { theme: Theme }) => ({
  placeholderTextColor: props.theme.colors.text.placeholder,
}))<StyledInputProps>`
  background-color: ${(props: StyledInputProps) => props.theme.colors.input.background};
  color: ${(props: StyledInputProps) => props.theme.colors.input.text};
  padding: 12px 16px;
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
