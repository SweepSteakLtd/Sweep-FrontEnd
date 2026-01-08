import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const CardWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
`;

interface CardProps {
  height: number;
}

export const Card = styled.TouchableOpacity<CardProps>`
  width: 100%;
  height: ${({ height }: CardProps) => height}px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const CoverImage = styled.Image`
  width: 100%;
  height: 100%;
`;

interface OverlayProps {
  padding: number;
}

interface OverlayPropsWithAccent extends OverlayProps {
  accentColor?: string;
}

export const Overlay = styled.View<OverlayPropsWithAccent>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ padding }: OverlayPropsWithAccent) => padding}px;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom-width: ${({ accentColor }: OverlayPropsWithAccent) => (accentColor ? 4 : 0)}px;
  border-bottom-color: ${({ accentColor }: OverlayPropsWithAccent) => accentColor || 'transparent'};
`;

interface TitleProps {
  fontSize: number;
  fontWeight: string;
}

export const Title = styled.Text<TitleProps>`
  font-size: ${({ fontSize }: TitleProps) => fontSize}px;
  font-weight: ${({ fontWeight }: TitleProps) => fontWeight};
  color: #ffffff;
  margin-bottom: 4px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
`;

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
