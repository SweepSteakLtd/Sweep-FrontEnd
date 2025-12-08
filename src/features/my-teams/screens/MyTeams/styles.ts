import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 20px;
  margin-top: 16px;
  margin-bottom: 24px;
  border-radius: 16px;
`;

export const BalanceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BalanceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const BalanceAmount = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  padding-top: 20px;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.1);
`;

export const StatItem = styled.View`
  align-items: center;
  flex: 1;
`;

export const StatCircle = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const StatValue = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 60px 40px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 16px;
  margin-top: 20px;
`;

export const EmptyStateIcon = styled.Text`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const EmptyStateTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const EmptyStateText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  text-align: center;
  line-height: 20px;
`;
