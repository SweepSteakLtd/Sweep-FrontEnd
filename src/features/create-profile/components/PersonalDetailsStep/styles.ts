import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const StepContainer = styled.View`
  width: 100%;
`;

export const StepTitle = styled.View`
  margin-bottom: 8px;
`;

export const StepDescription = styled.View`
  margin-bottom: 24px;
`;

export const DateButton = styled.Pressable`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

interface DateButtonTextProps {
  hasValue: boolean;
}

export const DateButtonText = styled.Text<DateButtonTextProps>`
  font-size: 16px;
  color: ${({ theme, hasValue }: DateButtonTextProps & { theme: Theme }) =>
    hasValue ? theme.colors.text.primary : theme.colors.text.placeholder};
`;
