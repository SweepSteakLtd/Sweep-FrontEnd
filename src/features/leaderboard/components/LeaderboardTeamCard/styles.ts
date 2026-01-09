import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.TouchableOpacity<{
  isTopThree?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  background-color: ${({
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#FFFFFF'
      : isOpenTournament
        ? '#FFB200'
        : isPGATournament
          ? '#0D2363'
          : '#1e40af'};
  border-bottom-width: ${({ isLast }: { isLast?: boolean }) => (isLast ? '0px' : '1px')};
  border-bottom-color: ${({
    isOpenTournament,
    isMastersTournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
  }) =>
    isMastersTournament
      ? 'rgba(0, 0, 0, 0.1)'
      : isOpenTournament
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(255, 255, 255, 0.2)'};
  border-top-left-radius: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? '10px' : '0px')};
  border-top-right-radius: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? '10px' : '0px')};
  border-bottom-left-radius: ${({ isLast }: { isLast?: boolean }) => (isLast ? '10px' : '0px')};
  border-bottom-right-radius: ${({ isLast }: { isLast?: boolean }) => (isLast ? '10px' : '0px')};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 10px;
`;

export const RankBadge = styled.View<{
  isTopThree?: boolean;
  isMastersTournament?: boolean;
  primaryColor?: string;
}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({
    isMastersTournament,
    primaryColor,
  }: {
    isMastersTournament?: boolean;
    primaryColor?: string;
  }) => (isMastersTournament ? '#000000' : primaryColor || '#1e40af')};
  justify-content: center;
  align-items: center;
`;

export const RankText = styled.Text<{ isTopThree?: boolean; isMastersTournament?: boolean }>`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme, isMastersTournament }: { theme: Theme; isMastersTournament?: boolean }) =>
    isMastersTournament ? '#FFFFFF' : theme.colors.white};
`;

export const TeamInfo = styled.View`
  flex: 1;
  min-width: 0;
`;

export const TeamName = styled.Text<{ isOpenTournament?: boolean; isMastersTournament?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({
    theme,
    isOpenTournament,
    isMastersTournament,
  }: {
    theme: Theme;
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
  }) => (isMastersTournament ? '#000000' : isOpenTournament ? '#003366' : theme.colors.white)};
`;

export const OwnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
`;

export const OwnerName = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  font-size: 10px;
  color: ${({
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#000000'
      : isOpenTournament
        ? '#003366'
        : isPGATournament
          ? '#CCA600'
          : '#FFD700'};
`;

export const ScoreContainer = styled.View<{ isMastersTournament?: boolean }>`
  background-color: transparent;
  justify-content: center;
  align-items: flex-end;
  min-width: 60px;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const TotalScore = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  font-size: 16px;
  font-weight: 700;
  color: ${({
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#000000'
      : isOpenTournament
        ? '#003366'
        : isPGATournament
          ? '#CCA600'
          : '#FFD700'};
`;

export const BestScoresLabel = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
}>`
  font-size: 8px;
  color: ${({
    theme,
    isOpenTournament,
    isMastersTournament,
  }: {
    theme: Theme;
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
  }) => (isMastersTournament ? '#000000' : isOpenTournament ? '#003366' : theme.colors.white)};
  text-transform: uppercase;
  margin-top: 1px;
`;

export const BestScores = styled.View<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PrizeContainer = styled.View<{ isMastersTournament?: boolean }>`
  background-color: ${({ isMastersTournament }: { isMastersTournament?: boolean }) =>
    isMastersTournament ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const PrizeAmount = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  font-size: 10px;
  font-weight: 700;
  color: ${({
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#000000'
      : isOpenTournament
        ? '#003366'
        : isPGATournament
          ? '#CCA600'
          : '#FFD700'};
`;

export const ExpandButton = styled.View`
  align-items: center;
  justify-content: center;
  width: 16px;
`;

export const ExpandIcon = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
}>`
  font-size: 8px;
  color: ${({
    theme,
    isOpenTournament,
    isMastersTournament,
  }: {
    theme: Theme;
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
  }) => (isMastersTournament ? '#000000' : isOpenTournament ? '#003366' : theme.colors.white)};
`;

export const Divider = styled.View<{ isMastersTournament?: boolean }>`
  height: 1px;
  background-color: ${({ isMastersTournament }: { isMastersTournament?: boolean }) =>
    isMastersTournament ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
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

export const PlayerGroup = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  font-size: 11px;
  font-weight: 600;
  color: ${({
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#000000'
      : isOpenTournament
        ? '#003366'
        : isPGATournament
          ? '#CCA600'
          : '#FFD700'};
  width: 55px;
`;

export const PlayerName = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
}>`
  flex: 1;
  font-size: 13px;
  color: ${({
    theme,
    isOpenTournament,
    isMastersTournament,
  }: {
    theme: Theme;
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
  }) => (isMastersTournament ? '#000000' : isOpenTournament ? '#003366' : theme.colors.white)};
`;

export const PlayerScore = styled.Text<{
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  font-size: 13px;
  font-weight: 600;
  min-width: 50px;
  text-align: right;
  color: ${({
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#000000'
      : isOpenTournament
        ? '#003366'
        : isPGATournament
          ? '#CCA600'
          : '#FFD700'};
`;

export const PinIcon = styled.Text<{
  isPinned?: boolean;
  isOpenTournament?: boolean;
  isMastersTournament?: boolean;
  isPGATournament?: boolean;
}>`
  font-size: 12px;
  color: ${({
    theme,
    isPinned,
    isOpenTournament,
    isMastersTournament,
    isPGATournament,
  }: {
    theme: Theme;
    isPinned?: boolean;
    isOpenTournament?: boolean;
    isMastersTournament?: boolean;
    isPGATournament?: boolean;
  }) =>
    isMastersTournament
      ? '#000000'
      : isOpenTournament
        ? '#003366'
        : isPinned
          ? isPGATournament
            ? '#CCA600'
            : '#FFD700'
          : theme.colors.white};
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
