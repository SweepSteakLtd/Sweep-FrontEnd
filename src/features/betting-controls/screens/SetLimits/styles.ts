import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 16 },
})``;

export const TabContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 25px;
  padding: 4px;
  margin-bottom: 20px;
`;

interface TabProps {
  active: boolean;
}

export const Tab = styled.TouchableOpacity<TabProps>`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  background-color: ${({ theme, active }: { theme: Theme; active: boolean }) =>
    active ? theme.colors.text.primary : 'transparent'};
  align-items: center;
`;

export const TabText = styled.Text<TabProps>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, active }: { theme: Theme; active: boolean }) =>
    active ? theme.colors.white : theme.colors.text.secondary};
`;

export const Section = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 12px;
`;

export const InputRow = styled.View`
  margin-bottom: 20px;
`;

export const LimitLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const RemoveButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 4px;
`;

export const RemoveButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  padding: 0 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;
