import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';
import type { Theme } from '~/theme/theme';

export const ContentWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 48px;
`;

export const Emoji = styled(Typography)`
  font-size: 64px;
  margin-bottom: 20px;
  line-height: 72px;
  text-align: center;
`;

export const Heading = styled(Typography)`
  font-size: 24px;
  text-align: center;
`;

export const Description = styled(Typography)`
  margin-top: 12px;
  text-align: center;
  font-size: 16px;
  margin-bottom: 32px;
`;

export const ProgressBarContainer = styled.View`
  width: 80%;
  height: 12px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  border-radius: 6px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const AnimatedProgressBar = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  border-radius: 6px;
`;
