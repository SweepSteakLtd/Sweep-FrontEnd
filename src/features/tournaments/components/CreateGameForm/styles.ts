import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const FormTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
  margin-top: 16px;
`;

export const FormInput = styled.TextInput`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const GameTypeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const SwitchLabel = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme, isActive }: { theme: Theme; isActive: boolean }) =>
    isActive ? theme.colors.primary : theme.colors.text.secondary};
`;

export const ButtonContainer = styled.View`
  margin-top: 32px;
  margin-bottom: 100px;
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  margin-top: 8px;
`;
