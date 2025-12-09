import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
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
  title?: string;
  description?: string;
  showProgressBar?: boolean;
}

export const LoadingState = ({
  complete = false,
  title = 'Creating your profile',
  description = 'This may take a few moments...',
  showProgressBar = true,
}: LoadingStateProps) => {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (showProgressBar) {
      // Animate progress bar from 0 to 85% over 12 seconds, then wait for API response
      progress.value = withTiming(85, {
        duration: 12000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } else {
      // Animate hourglass - spin 180°, pause, spin 180°, pause (like real hourglass)
      rotation.value = withRepeat(
        withSequence(
          withTiming(180, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(180, { duration: 1500 }), // Pause while "sand falls"
          withTiming(360, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(360, { duration: 1500 }), // Pause while "sand falls"
        ),
        -1,
        false,
      );
    }
  }, [progress, rotation, showProgressBar]);

  useEffect(() => {
    // When API completes successfully, animate from current value to 100%
    if (complete && showProgressBar) {
      progress.value = withTiming(100, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  }, [complete, progress, showProgressBar]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  const hourglassStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Container>
      <ContentWrapper>
        {showProgressBar ? (
          <Emoji variant="title">⏳</Emoji>
        ) : (
          <Animated.Text
            style={[
              { fontSize: 48, lineHeight: 56, textAlign: 'center', marginBottom: 24 },
              hourglassStyle,
            ]}
          >
            ⏳
          </Animated.Text>
        )}
        <Heading variant="heading">{title}</Heading>
        <Description variant="body">{description}</Description>

        {showProgressBar && (
          <ProgressBarContainer>
            <AnimatedProgressBar style={progressStyle} />
          </ProgressBarContainer>
        )}
      </ContentWrapper>
    </Container>
  );
};
