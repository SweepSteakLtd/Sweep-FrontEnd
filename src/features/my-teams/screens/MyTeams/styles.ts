import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 20, paddingHorizontal: 16 },
})``;

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

export const TeamCard = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 16px;
  margin-bottom: 12px;
  overflow: hidden;
`;

export const TeamCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
`;

export const TeamHeader = styled.View`
  flex: 1;
`;

export const TeamName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const LeagueName = styled.Text`
  font-size: 13px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const PositionBadge = styled.View<{ isTop3?: boolean }>`
  background-color: ${({ theme, isTop3 }: { theme: Theme; isTop3?: boolean }) =>
    isTop3 ? theme.colors.primary : theme.colors.background};
  padding: 8px 12px;
  border-radius: 12px;
  min-width: 48px;
  align-items: center;
`;

export const PositionText = styled.Text<{ isTop3?: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme, isTop3 }: { theme: Theme; isTop3?: boolean }) =>
    isTop3 ? theme.colors.white : theme.colors.text.secondary};
`;

export const PlayersContainer = styled.View`
  padding: 12px 16px;
`;

export const PlayersRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PlayerChip = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  padding: 6px 10px;
  border-radius: 8px;
`;

export const PlayerAvatar = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

export const PlayerAvatarText = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const PlayerName = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const TeamDetails = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const TeamDetailText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const TeamDivider = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.border};
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
