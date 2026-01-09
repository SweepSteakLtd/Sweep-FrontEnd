import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 90;

export const Container = styled.View`
  width: ${SCREEN_WIDTH}px;
  height: ${HEADER_HEIGHT}px;
  background-color: #ffffff;
  overflow: hidden;
  border-top-left-radius: ${SCREEN_WIDTH}px;
  border-top-right-radius: ${SCREEN_WIDTH}px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-top-width: 2px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const LogoImage = styled.Image`
  width: ${SCREEN_WIDTH * 0.5}px;
  height: ${HEADER_HEIGHT * 0.6}px;
  max-width: 200px;
  max-height: 60px;
`;


