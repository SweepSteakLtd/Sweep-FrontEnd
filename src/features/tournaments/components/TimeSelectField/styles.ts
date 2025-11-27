import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const FieldContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const FieldLabel = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const FieldTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const FieldValue = styled.Text<{ disabled?: boolean }>`
  font-size: 14px;
  color: ${({ theme, disabled }: { theme: Theme; disabled?: boolean }) =>
    disabled ? theme.colors.text.secondary : theme.colors.primary};
  text-decoration-line: ${({ disabled }: { disabled?: boolean }) =>
    disabled ? 'none' : 'underline'};
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.7 : 1)};
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  margin-top: 4px;
`;
