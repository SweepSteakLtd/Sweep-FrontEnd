import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Container } from '../../screens/CreateProfile/styles';
import {
  AnimatedProgressBar,
  ContentWrapper,
  Description,
  Emoji,
  Heading,
  ProgressBarContainer,
} from './styles';

interface LoadingStateProps {
  complete?: boolean;
}

export const LoadingState = ({ complete = false }: LoadingStateProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    // Animate progress bar from 0 to 85% over 12 seconds, then wait for API response
    progress.value = withTiming(85, {
      duration: 12000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress]);

  useEffect(() => {
    // When API completes successfully, animate from current value to 100%
    if (complete) {
      progress.value = withTiming(100, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  }, [complete, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <Container>
      <ContentWrapper>
        <Emoji variant="title">⏳</Emoji>
        <Heading variant="heading">Creating your profile</Heading>
        <Description variant="body">This may take a few moments...</Description>

        <ProgressBarContainer>
          <AnimatedProgressBar style={animatedStyle} />
        </ProgressBarContainer>
      </ContentWrapper>
    </Container>
  );
};
