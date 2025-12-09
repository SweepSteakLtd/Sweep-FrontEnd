import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface CardContainerProps {
  $isPlaceholder?: boolean;
}

export const CardContainer = styled.View<CardContainerProps>`
  align-items: center;
  background-color: ${({ theme, $isPlaceholder }: { theme: Theme } & CardContainerProps) =>
    $isPlaceholder ? 'transparent' : theme.colors.card};
  border-radius: 12px;
  padding: 12px 10px 10px;
  margin-right: 10px;
  border-width: 1px;
  border-color: ${({ theme, $isPlaceholder }: { theme: Theme } & CardContainerProps) =>
    $isPlaceholder ? theme.colors.border : `${theme.colors.primary}40`};
  position: relative;
  width: 80px;
  height: 106px;
  ${({ $isPlaceholder }: CardContainerProps) => $isPlaceholder && 'border-style: dashed;'}
`;

export const PlayerName = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-top: 6px;
  text-align: center;
  max-width: 70px;
`;

export const GroupBadge = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary}20;
  border-radius: 4px;
  padding: 2px 6px;
  margin-top: 4px;
`;

export const GroupText = styled.Text`
  font-size: 9px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary}60;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const RemoveText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  line-height: 16px;
  margin-top: -1px;
`;

export const PlaceholderAvatar = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
`;

export const PlaceholderIcon = styled.Text`
  font-size: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const PlaceholderText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-top: 6px;
  text-align: center;
  max-width: 70px;
`;
