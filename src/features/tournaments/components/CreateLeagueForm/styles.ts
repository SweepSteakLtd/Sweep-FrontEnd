import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const FormContainer = styled.View`
  padding: 20px;
`;

export const LeagueTypeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SwitchLabel = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme, isActive }: { theme: Theme; isActive: boolean }) =>
    isActive ? theme.colors.primary : theme.colors.text.secondary};
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  margin-top: 8px;
`;
