import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})`
  flex: 1;
`;

export const Header = styled.View`
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const LeagueName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 8px;
`;

export const InfoItem = styled.View`
  align-items: center;
  flex: 1;
`;

export const InfoIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const InfoLabel = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-bottom: 4px;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const ButtonsContainer = styled.View`
  padding: 0 16px;
  gap: 12px;
`;

export const TimeSection = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const TimeLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const TimeValue = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
