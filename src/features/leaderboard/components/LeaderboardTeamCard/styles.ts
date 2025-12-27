import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.TouchableOpacity<{
  isTopThree?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isOpenTournament?: boolean;
  isPGATournament?: boolean;
}>`
  background-color: ${({ isOpenTournament, isPGATournament }: { isOpenTournament?: boolean; isPGATournament?: boolean }) =>
    isOpenTournament ? '#FFB200' : isPGATournament ? '#0D2363' : '#1e40af'};
  border-bottom-width: ${({ isLast }: { isLast?: boolean }) => (isLast ? '0px' : '1px')};
  border-bottom-color: ${({ isOpenTournament }: { isOpenTournament?: boolean }) =>
    isOpenTournament ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
  border-top-left-radius: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? '10px' : '0px')};
  border-top-right-radius: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? '10px' : '0px')};
  border-bottom-left-radius: ${({ isLast }: { isLast?: boolean }) => (isLast ? '10px' : '0px')};
  border-bottom-right-radius: ${({ isLast }: { isLast?: boolean }) => (isLast ? '10px' : '0px')};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
`;

export const RankBadge = styled.View<{ isTopThree?: boolean; primaryColor?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ primaryColor }: { primaryColor?: string }) =>
    primaryColor || '#1e40af'};
  justify-content: center;
  align-items: center;
`;

export const RankText = styled.Text<{ isTopThree?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const TeamInfo = styled.View`
  flex: 1;
  min-width: 0;
`;

export const TeamName = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const OwnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
`;

export const OwnerName = styled.Text<{ isPGATournament?: boolean }>`
  font-size: 10px;
  color: ${({ isPGATournament }: { isPGATournament?: boolean }) =>
    isPGATournament ? '#CCA600' : '#FFD700'};
`;

export const ScoreContainer = styled.View<{ isMastersTournament?: boolean }>`
  background-color: ${({ isMastersTournament }: { isMastersTournament?: boolean }) =>
    isMastersTournament ? '#ff4444' : 'transparent'};
  justify-content: center;
  min-width: 60px;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const TotalScore = styled.Text<{ isMastersTournament?: boolean; isPGATournament?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme, isMastersTournament, isPGATournament }: { theme: Theme; isMastersTournament?: boolean; isPGATournament?: boolean }) =>
    isMastersTournament ? theme.colors.white : isPGATournament ? '#CCA600' : '#FFD700'};
`;

export const BestScoresLabel = styled.Text<{ isMastersTournament?: boolean }>`
  font-size: 8px;
  color: ${({ theme, isMastersTournament }: { theme: Theme; isMastersTournament?: boolean }) =>
    isMastersTournament ? theme.colors.white : theme.colors.white};
  text-transform: uppercase;
  margin-top: 1px;
`;

export const BestScores = styled.Text<{ isMastersTournament?: boolean; isPGATournament?: boolean }>`
  font-size: 9px;
  color: ${({ theme, isMastersTournament, isPGATournament }: { theme: Theme; isMastersTournament?: boolean; isPGATournament?: boolean }) =>
    isMastersTournament ? theme.colors.white : isPGATournament ? '#CCA600' : '#FFD700'};
`;

export const PrizeContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
`;

export const PrizeAmount = styled.Text<{ isPGATournament?: boolean }>`
  font-size: 10px;
  font-weight: 700;
  color: ${({ isPGATournament }: { isPGATournament?: boolean }) =>
    isPGATournament ? '#CCA600' : '#FFD700'};
`;

export const ExpandButton = styled.View`
  align-items: center;
  justify-content: center;
  width: 16px;
`;

export const ExpandIcon = styled.Text`
  font-size: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
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

export const PlayerGroup = styled.Text<{ isPGATournament?: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${({ isPGATournament }: { isPGATournament?: boolean }) =>
    isPGATournament ? '#CCA600' : '#FFD700'};
  width: 55px;
`;

export const PlayerName = styled.Text`
  flex: 1;
  font-size: 13px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const PlayerScore = styled.Text<{ isPGATournament?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  min-width: 50px;
  text-align: right;
  color: ${({ isPGATournament }: { isPGATournament?: boolean }) =>
    isPGATournament ? '#CCA600' : '#FFD700'};
`;

export const PinIcon = styled.Text<{ isPinned?: boolean; isPGATournament?: boolean }>`
  font-size: 12px;
  color: ${({ theme, isPinned, isPGATournament }: { theme: Theme; isPinned?: boolean; isPGATournament?: boolean }) =>
    isPinned ? (isPGATournament ? '#CCA600' : '#FFD700') : theme.colors.white};
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
