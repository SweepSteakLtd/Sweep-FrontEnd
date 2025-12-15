import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface BackgroundColorProps {
  backgroundColor?: string;
}

export const SafeAreaContainer = styled.View<BackgroundColorProps>`
  background-color: ${({ backgroundColor, theme }: BackgroundColorProps & { theme: Theme }) =>
    backgroundColor || theme.colors.primary};
`;

export const Container = styled.View<BackgroundColorProps>`
  background-color: ${({ backgroundColor, theme }: BackgroundColorProps & { theme: Theme }) =>
    backgroundColor || theme.colors.primary};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding-left: 8px;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 10;
  elevation: 10;
`;

export const RightSection = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 10;
  elevation: 10;
  margin-left: auto;
`;

export const Title = styled.Text`
  position: absolute;
  left: 0;
  right: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  text-align: center;
  padding-horizontal: 48px;
  pointer-events: none;
`;
