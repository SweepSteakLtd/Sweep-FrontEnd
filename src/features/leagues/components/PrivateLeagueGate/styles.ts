import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const PrivateLeagueContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const PrivateLeagueCard = styled.View`
  width: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 16px;
  padding: 24px;
  align-items: center;
`;

export const PrivateLeagueIcon = styled.Text`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const PrivateLeagueTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  text-align: center;
`;

export const PrivateLeagueDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
`;

export const JoinCodeInputContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  text-align: center;
  margin-bottom: 16px;
`;
