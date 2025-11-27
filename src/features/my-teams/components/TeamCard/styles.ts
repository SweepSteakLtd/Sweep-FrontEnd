import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.15);
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 3;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
`;

export const Header = styled.View`
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
  align-items: center;
`;

export const PlayerCount = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-left: 8px;
`;

export const Footer = styled.View`
  padding: 12px 16px;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.1);
`;

export const TournamentStatus = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;
