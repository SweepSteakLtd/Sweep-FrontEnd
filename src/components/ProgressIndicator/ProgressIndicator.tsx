import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Container, ProgressBar, ProgressFill, ProgressText } from './styles';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  showStepText?: boolean;
}

export const ProgressIndicator = ({
  currentStep,
  totalSteps,
  showStepText = false,
}: ProgressIndicatorProps) => {
  // Calculate progress including the current step as completed
  // Step 1 = 14.3%, Step 2 = 28.6%, ..., Step 7 = 100%
  const progress = (currentStep / totalSteps) * 100;

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
      {showStepText && (
        <ProgressText>
          Step {currentStep} of {totalSteps}
        </ProgressText>
      )}
    </Container>
  );
};
