import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-left: 12px;
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const Section = styled.View`
  padding: 20px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
  border-radius: 12px;
  margin-bottom: 20px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const ToggleLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  flex: 1;
`;

export const HandlerCard = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const HandlerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HandlerInfo = styled.View`
  flex: 1;
  margin-right: 12px;
`;

export const HandlerName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const HandlerMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const HandlerMethod = styled.Text<{ method: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ method }) => {
    switch (method) {
      case 'GET':
        return '#10b981';
      case 'POST':
        return '#3b82f6';
      case 'PUT':
        return '#f59e0b';
      case 'DELETE':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }};
  margin-right: 8px;
`;

export const HandlerUrl = styled.Text`
  font-size: 11px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.textSecondary};
  flex: 1;
`;

export const SelectedScenario = styled.Text`
  font-size: 13px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  margin-top: 8px;
`;

export const EmptyState = styled.View`
  padding: 40px 20px;
  align-items: center;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.textSecondary};
  text-align: center;
`;

// Bottom Sheet Styles
export const BottomSheetContainer = styled.View`
  padding: 20px;
  padding-bottom: 40px;
`;

export const BottomSheetTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 20px;
`;

export const ScenarioOption = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.primary + '15' : theme.colors.card};
  border-width: 2px;
  border-color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.primary : theme.colors.border};
  margin-bottom: 12px;
`;

export const ScenarioText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? '600' : '500')};
  color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.primary : theme.colors.text.secondary};
  flex: 1;
`;

export const CheckIcon = styled.Text`
  font-size: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

// Delay Selector Styles
export const DelaySection = styled.View`
  margin-bottom: 20px;
`;

export const DelayLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 12px;
`;

export const DelayButtonsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const DelayButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.primary : theme.colors.card};
  border-width: 1px;
  border-color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.primary : theme.colors.border};
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const DelayButtonText = styled.Text<{ selected: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.white : theme.colors.text.secondary};
`;
