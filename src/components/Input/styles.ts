import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { Typography } from '../Typography/Typography';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 18px;
`;

interface InputWrapperProps {
  isFocused: boolean;
  hasError: boolean;
  disabled?: boolean;
}

export const InputWrapper = styled.View<InputWrapperProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, disabled }: { theme: Theme; disabled?: boolean }) =>
    disabled ? theme.colors.backgroundLight : theme.colors.input.background};
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
  border-radius: 8px;
  padding: 16px 18px;
  min-height: 56px;
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.6 : 1)};
`;

export const Prefix = styled.View`
  margin-right: 8px;
`;

export const EyeIconButton = styled.TouchableOpacity`
  margin-left: 8px;
`;

export const StyledInput = styled.TextInput.attrs(({ theme }: { theme: Theme }) => ({
  placeholderTextColor: theme.colors.text.placeholder,
}))`
  flex: 1;
  color: ${({ theme }: { theme: Theme }) => theme.colors.input.text};
  font-size: 16px;
  padding: 0;
  min-height: 24px;
`;

export const ErrorText = styled(Typography)`
  margin-top: 4px;
`;
