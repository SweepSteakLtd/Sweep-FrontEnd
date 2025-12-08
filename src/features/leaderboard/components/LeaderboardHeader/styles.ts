import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  coverContainer: {
    width: SCREEN_WIDTH,
    marginBottom: 20,
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
  },
});

export const Container = styled.View`
  margin-top: 16px;
  margin-bottom: 20px;
  padding-horizontal: 16px;
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
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
`;

export const TournamentName = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const TeamsCard = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 16px;
  align-items: center;
`;

export const TeamsCount = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
`;

export const TeamsLabel = styled.Text`
  font-size: 12px;
  color: #666666;
  margin-top: 4px;
`;

export const PrizeCard = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 16px;
  align-items: center;
`;

export const PrizeAmount = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
`;

export const PrizeLabel = styled.Text`
  font-size: 12px;
  color: #666666;
  margin-top: 4px;
`;
