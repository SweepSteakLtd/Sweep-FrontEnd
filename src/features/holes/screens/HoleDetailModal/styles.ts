import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ContentContainer = styled.View`
  width: 100%;
  max-height: 80%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const CloseButtonText = styled.Text`
  font-size: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;
