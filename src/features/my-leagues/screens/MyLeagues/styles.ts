import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 20, paddingHorizontal: 0 },
})``;

export const Header = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 16px;
  margin-horizontal: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const BalanceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BalanceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const BalanceAmount = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const BalanceBadge = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  padding: 4px 12px;
  border-radius: 16px;
`;

export const BalanceBadgeText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

export const StatItem = styled.View`
  align-items: center;
`;

export const StatCircle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 3px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const StatValue = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const StatLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
  margin-horizontal: 16px;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 16px;
`;
