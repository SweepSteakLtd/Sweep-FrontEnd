import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { HEADER_MIN_HEIGHT } from '~/constants/ui';
import type { Theme } from '~/theme/theme';
import { hexWithOpacity } from '~/utils/color';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  coverContainer: {
    width: SCREEN_WIDTH,
    marginBottom: 8,
    minHeight: HEADER_MIN_HEIGHT.STANDARD,
  },
  coverImage: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%',
  },
  coverOverlay: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    minHeight: HEADER_MIN_HEIGHT.STANDARD,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const Container = styled.View`
  margin-top: 16px;
  margin-bottom: 20px;
  padding-horizontal: 16px;
  min-height: ${HEADER_MIN_HEIGHT.STANDARD}px;
`;

export const TournamentInfo = styled.View<{ hasCover: boolean }>`
  align-items: center;
  align-self: center;
  margin-bottom: 20px;

  ${({ hasCover }: { hasCover: boolean }) =>
    hasCover &&
    `
    background-color: rgba(255, 255, 255, 0.9);
    padding: 12px 20px;
    border-radius: 12px;
  `}
`;

export const LeagueName = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
`;

export const TournamentName = styled.Text`
  font-size: 16px;
  color: white;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const StatItem = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) =>
    hexWithOpacity(theme.colors.backgroundLight, 0.8)};
  padding: 8px 20px;
  border-radius: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const NumberOfTeams = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const PrizePool = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const PrizePoolAmount = styled.Text`
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;
