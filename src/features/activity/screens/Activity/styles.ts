import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const Header = styled.View`
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const BalanceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BalanceAmount = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const PFButton = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const PFButtonText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 700;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 12px;
`;

export const LeftContent = styled.View`
  flex: 1;
`;

export const RightContent = styled.View`
  margin-left: 16px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 12px;
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`;

interface TabButtonProps {
  active?: boolean;
}

export const TabButton = styled.TouchableOpacity<TabButtonProps>`
  padding: 6px 14px;
  border-radius: 20px;
  background-color: ${({ theme, active }: { theme: Theme; active?: boolean }) =>
    active ? theme.colors.primary : theme.colors.white};
  border-width: 1px;
  border-color: ${({ theme, active }: { theme: Theme; active?: boolean }) =>
    active ? theme.colors.primary : theme.colors.border};
`;

export const TabButtonText = styled.Text<TabButtonProps>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, active }: { theme: Theme; active?: boolean }) =>
    active ? theme.colors.white : theme.colors.text.secondary};
`;

export const FilterContainer = styled.View`
  gap: 8px;
`;

interface FilterPillProps {
  active?: boolean;
}

export const FilterPill = styled.TouchableOpacity<FilterPillProps>`
  padding: 8px 12px;
  border-radius: 20px;
  background-color: ${({ theme, active }: { theme: Theme; active?: boolean }) =>
    active ? theme.colors.primary : theme.colors.white};
  border-width: 1px;
  border-color: ${({ theme, active }: { theme: Theme; active?: boolean }) =>
    active ? theme.colors.primary : theme.colors.border};
`;

export const FilterPillText = styled.Text<FilterPillProps>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme, active }: { theme: Theme; active?: boolean }) =>
    active ? theme.colors.white : theme.colors.text.secondary};
`;

export const ErrorState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyState = styled.View`
  padding: 20px 20px;
  align-items: center;
`;

export const EmptyStateTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const EmptyStateText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const StatRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StatCard = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 16px 8px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  align-items: center;
  min-width: 0;
  justify-content: center;
`;

export const StatValue = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
  text-align: center;
  flex-shrink: 1;
  number-of-lines: 1;
`;

export const StatLabel = styled.Text`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  flex-shrink: 0;
`;

export const InfoText = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 24px;
  line-height: 18px;
`;

export const TransactionCard = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  margin-bottom: 12px;
`;

export const TransactionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TransactionType = styled.View`
  flex: 1;
`;

export const TransactionDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

interface TransactionValueProps {
  positive?: boolean;
  color?: string;
}

export const TransactionValue = styled.Text<TransactionValueProps>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ color, theme }: { color?: string; theme: Theme }) =>
    color || theme.colors.text.primary};
`;

interface StatusBadgeProps {
  status?: string;
}

export const StatusBadge = styled.View<StatusBadgeProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ status }: { status?: string }) => {
    if (status === 'COMPLETED') return '#22c55e';
    if (status === 'FAILED') return '#ef4444';
    if (status === 'REFUND') return '#eab308';
    return '#94a3b8';
  }};
  position: absolute;
  top: 16px;
  right: 16px;
`;
