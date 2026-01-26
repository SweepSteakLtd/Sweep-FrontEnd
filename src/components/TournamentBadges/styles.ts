import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const LiveBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #ff0000;
  padding: 6px 12px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  z-index: 10;
`;

export const LiveDot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #ffffff;
`;

export const LiveText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const FinishedBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  padding: 6px 12px;
  border-radius: 6px;
  z-index: 10;
`;

export const FinishedText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StartsInBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: 6px;
  z-index: 10;
`;

export const StartsInText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;
