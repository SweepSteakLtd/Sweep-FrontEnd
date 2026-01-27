import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { HEADER_MIN_HEIGHT } from '~/constants/ui';
import type { Theme } from '~/theme/theme';
import { hexWithOpacity } from '~/utils/color';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  margin-bottom: 16px;
  overflow: hidden;
  min-height: ${HEADER_MIN_HEIGHT.STANDARD}px;
`;

export const HeaderBackgroundImage = styled.Image`
  position: absolute;
  width: ${SCREEN_WIDTH}px;
  height: 100%;
  top: 0;
  left: 0;
`;

export const HeaderOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding-bottom: 16px;
  min-height: ${HEADER_MIN_HEIGHT.STANDARD}px;
  display: flex;
  justify-content: space-between;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
`;

export const ButtonsContainer = styled.View`
  padding: 0 16px;
  gap: 12px;
`;
