import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.TouchableOpacity<{ isFinished?: boolean }>`
  padding: 10px 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
  margin-horizontal: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 3;
  opacity: ${({ isFinished }: { isFinished?: boolean }) => (isFinished ? 0.5 : 1)};
`;

export const CardContainer = styled.View`
  gap: 6px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LeftSection = styled.View`
  flex: 1;
  padding-right: 16px;
`;

export const RightSection = styled.View`
  align-items: flex-end;
`;

export const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const GameName = styled.Text<{ isLive?: boolean }>`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme, isLive }: { theme: Theme; isLive?: boolean }) =>
    isLive ? theme.colors.primary : theme.colors.text.primary};
  line-height: 24px;
  flex-shrink: 1;
`;

export const PrivatePill = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  padding: 2px 8px;
  border-radius: 10px;
`;

export const PrivatePillText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const TournamentInfo = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  line-height: 16px;
  flex: 1;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
`;

export const LiveDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const StatusText = styled.Text<{ isLive?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme, isLive }: { theme: Theme; isLive?: boolean }) =>
    isLive ? theme.colors.primary : theme.colors.text.secondary};
`;

export const TimeText = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  line-height: 18px;
`;

export const PlayersText = styled.View``;

export const InfoLabel = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  line-height: 18px;
`;

export const AmountText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  line-height: 24px;
`;

export const EntryFeeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const EntryFeeLabel = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  line-height: 14px;
`;

export const EntryFeeText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.secondary};
  line-height: 18px;
`;

export const DeleteButton = styled.View`
  width: 80px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-right: 16px;
  margin-bottom: 12px;
  flex: 1;
`;
