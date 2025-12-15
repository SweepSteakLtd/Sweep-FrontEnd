import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { hexWithOpacity } from '~/utils/color';

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
`;

export const PotInfo = styled.View`
  padding: 20px;
  margin: 16px;
  margin-bottom: 8px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 16px;
  align-items: center;
`;

export const PotLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
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
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 16px;
  border-radius: 16px;
  align-items: center;
`;

export const StatValue = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const TournamentName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  padding: 16px 32px;
`;
