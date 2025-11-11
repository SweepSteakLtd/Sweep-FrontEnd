import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Container, ProgressBar, ProgressFill, ProgressText } from './styles';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  // Calculate progress based on completed steps, not current step
  // Step 1 = 0%, Step 2 = 25%, Step 3 = 50%, Step 4 = 75%
  const progress = ((currentStep - 1) / totalSteps) * 100;

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  return (
    <Container>
      <ProgressText>
        Step {currentStep} of {totalSteps}
      </ProgressText>
      <ProgressBar>
        <ProgressFill
          as={Animated.View}
          style={{
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </ProgressBar>
    </Container>
  );
};
