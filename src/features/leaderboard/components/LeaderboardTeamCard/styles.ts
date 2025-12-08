import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.TouchableOpacity<{
  isTopThree?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}>`
  background-color: ${({ theme, isTopThree }: { theme: Theme; isTopThree?: boolean }) =>
    isTopThree ? `${theme.colors.primary}10` : 'transparent'};
  border-bottom-width: ${({ isLast }: { isLast?: boolean }) => (isLast ? '0px' : '1px')};
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  border-top-left-radius: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? '12px' : '0px')};
  border-top-right-radius: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? '12px' : '0px')};
  border-bottom-left-radius: ${({ isLast }: { isLast?: boolean }) => (isLast ? '12px' : '0px')};
  border-bottom-right-radius: ${({ isLast }: { isLast?: boolean }) => (isLast ? '12px' : '0px')};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
`;

export const RankBadge = styled.View<{ isTopThree?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme, isTopThree }: { theme: Theme; isTopThree?: boolean }) =>
    isTopThree ? theme.colors.primary : theme.colors.backgroundLight};
  justify-content: center;
  align-items: center;
`;

export const RankText = styled.Text<{ isTopThree?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme, isTopThree }: { theme: Theme; isTopThree?: boolean }) =>
    isTopThree ? theme.colors.background : theme.colors.text.secondary};
`;

export const TeamInfo = styled.View`
  flex: 1;
  min-width: 0;
`;

export const TeamName = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const OwnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
`;

export const OwnerName = styled.Text`
  font-size: 10px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const ScoreContainer = styled.View`
  align-items: flex-end;
  min-width: 60px;
`;

export const TotalScore = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const BestScoresLabel = styled.Text`
  font-size: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  margin-top: 1px;
`;

export const BestScores = styled.Text`
  font-size: 9px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const PrizeContainer = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary}20;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const PrizeAmount = styled.Text`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const ExpandButton = styled.View`
  align-items: center;
  justify-content: center;
  width: 16px;
`;

export const ExpandIcon = styled.Text`
  font-size: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
`;

export const PlayersGrid = styled.View`
  padding: 12px;
  gap: 8px;
`;

export const PlayerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const PlayerGroup = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  width: 55px;
`;

export const PlayerName = styled.Text`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const PlayerScore = styled.Text`
  font-size: 13px;
  font-weight: 600;
  min-width: 50px;
  text-align: right;
`;

export const PinIcon = styled.Text<{ isPinned?: boolean }>`
  font-size: 12px;
  color: ${({ theme, isPinned }: { theme: Theme; isPinned?: boolean }) =>
    isPinned ? theme.colors.primary : theme.colors.text.tertiary};
`;

export const SwipeActionButton = styled.View<{ isPinned?: boolean }>`
  width: 50px;
  background-color: ${({ theme, isPinned }: { theme: Theme; isPinned?: boolean }) =>
    isPinned ? theme.colors.text.tertiary : theme.colors.primary};
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 8px;
  margin-left: 4px;
`;

export const SwipeActionText = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  margin-top: 1px;
`;
