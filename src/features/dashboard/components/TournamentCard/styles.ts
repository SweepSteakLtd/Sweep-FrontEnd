import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const CardWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 4px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
`;

export const TournamentImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const TournamentOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px;
`;

export const TournamentTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;
