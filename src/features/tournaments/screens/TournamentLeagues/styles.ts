import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { hexWithOpacity } from '~/utils/color';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HeaderSectionProps {
  backgroundColor?: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const HeaderSection = styled.View<HeaderSectionProps>`
  background-color: ${({ backgroundColor }: HeaderSectionProps) =>
    backgroundColor ? hexWithOpacity(backgroundColor, 0.2) : 'transparent'};
  padding-bottom: 16px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const HeaderBackgroundImage = styled.Image`
  position: absolute;
  width: ${SCREEN_WIDTH}px;
  height: 100%;
  top: 0;
  left: 0;
`;

export const HeaderOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding-bottom: 16px;
`;

export const PotInfo = styled.View`
  padding: 20px;
  margin: 16px;
  margin-bottom: 8px;
  background-color: ${({ theme }: { theme: Theme }) =>
    hexWithOpacity(theme.colors.backgroundLight, 0.8)};
  border-radius: 16px;
  align-items: center;
`;

export const PotLabel = styled.Text`
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
`;

export const AmountWrapper = styled.View`
  margin-top: 4px;
`;

export const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const GlobalStatsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin: 0 16px 16px;
`;

export const StatItem = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) =>
    hexWithOpacity(theme.colors.backgroundLight, 0.8)};
  padding: 16px;
  border-radius: 16px;
  align-items: center;
`;

interface StatValueProps {
  color?: string;
}

export const StatValue = styled.Text<StatValueProps>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ color }: StatValueProps) => color || '#ffffff'};
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  color: #333333;
`;

export const TournamentName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  padding: 16px 32px;
`;
