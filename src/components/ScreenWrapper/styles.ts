import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface OuterContainerProps {
  contentBackgroundColor?: string;
}

export const OuterContainer = styled.View<OuterContainerProps>`
  flex: 1;
  background-color: ${({ contentBackgroundColor, theme }: OuterContainerProps & { theme: Theme }) =>
    contentBackgroundColor || theme.colors.background};
`;

interface StatusBarBackgroundProps {
  backgroundColor?: string;
}

export const StatusBarBackground = styled.View<StatusBarBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ backgroundColor, theme }: StatusBarBackgroundProps & { theme: Theme }) =>
    backgroundColor || theme.colors.primary};
`;

export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  flex: 1;
`;

export const ProfileButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  min-width: 44px;
  min-height: 44px;
`;

export const ProfileBalance = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
