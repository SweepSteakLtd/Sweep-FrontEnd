import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { Typography } from '../Typography/Typography';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

interface StyledTextAreaProps {
  isFocused: boolean;
  hasError: boolean;
}

export const StyledTextArea = styled.TextInput<StyledTextAreaProps>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.input.background};
  border-width: 1px;
  border-color: ${({ theme, isFocused, hasError }: StyledTextAreaProps & { theme: Theme }) => {
    if (hasError) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.input.border;
  }};
  border-radius: 8px;
  padding: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  font-size: 16px;
  min-height: 120px;
  max-height: 200px;
`;

interface CharacterCountProps {
  isNearLimit: boolean;
}

export const CharacterCount = styled.View<CharacterCountProps>`
  margin-top: 4px;
  align-items: flex-end;
`;

export const ErrorText = styled(Typography)`
  margin-top: 4px;
`;
