import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { hexWithOpacity } from '~/utils/color';

export const Container = styled.View`
  padding: 16px 16px 0;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

export const LeagueName = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const CodeCardWrapper = styled.View`
  margin-bottom: 16px;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
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
