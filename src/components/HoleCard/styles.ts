import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.View`
  width: 100%;
  border-radius: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  position: relative;
`;

export const HoleImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const NumberBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const NumberText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const ContentContainer = styled.View`
  padding: 16px;
`;

export const HoleName = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  line-height: 20px;
  margin-bottom: 12px;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StatText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const Separator = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin: 0 8px;
`;
