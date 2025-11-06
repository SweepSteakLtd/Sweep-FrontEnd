import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.TouchableOpacity`
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
`;

export const CardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const LeftSection = styled.View`
  flex: 1;
  gap: 6px;
  padding-right: 16px;
`;

export const RightSection = styled.View`
  align-items: flex-end;
  gap: 6px;
`;

export const GameName = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  line-height: 24px;
`;

export const TournamentInfo = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  line-height: 20px;
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
