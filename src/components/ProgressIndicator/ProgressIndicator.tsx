import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Reanimated from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import {
  CheckMark,
  Container,
  DotsContainer,
  DotsRow,
  DotsRowLine,
  DotsRowLineFill,
  DotsRowWrapper,
  LabelsRow,
  ProgressBar,
  ProgressFill,
  ProgressText,
  StepDot,
  StepLabel,
} from './styles';

import type { StyleProp, ViewStyle } from 'react-native';

interface BarProgressIndicatorProps {
  variant?: 'bar';
  currentStep: number;
  totalSteps: number;
  showStepText?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface DotsProgressIndicatorProps {
  variant: 'dots';
  steps: string[];
  currentStep: number;
  completedSteps: number[];
  style?: StyleProp<ViewStyle>;
}

type ProgressIndicatorProps = BarProgressIndicatorProps | DotsProgressIndicatorProps;

const AnimatedDot = ({ isActive, isCompleted }: { isActive: boolean; isCompleted: boolean }) => {
  const theme = useTheme();

  const bgColor = isCompleted ? theme.colors.primary : theme.colors.background;
  const borderCol = isActive || isCompleted ? theme.colors.primary : theme.colors.border;
  const size = isActive ? 22 : 18;

  return (
    <StepDot>
      <Reanimated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgColor,
          borderColor: borderCol,
        }}
      >
        {isCompleted && <CheckMark>✓</CheckMark>}
      </Reanimated.View>
    </StepDot>
  );
};

const BarVariant = ({
  currentStep,
  totalSteps,
  showStepText = false,
}: Omit<BarProgressIndicatorProps, 'variant'>) => {
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

const DotsVariant = ({
  steps,
  currentStep,
  completedSteps,
  style,
}: Omit<DotsProgressIndicatorProps, 'variant'>) => {
  // Calculate progress percentage for the line fill
  const lastCompletedIndex = Math.max(...completedSteps, -1);
  const progressPercent =
    steps.length > 1 ? ((lastCompletedIndex + 1) / (steps.length - 1)) * 100 : 0;
  const clampedProgress = Math.min(Math.max(progressPercent, 0), 100);

  return (
    <DotsContainer style={style}>
      <DotsRowWrapper>
        <DotsRowLine>
          <DotsRowLineFill style={{ width: `${clampedProgress}%` }} />
        </DotsRowLine>
        <DotsRow>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);

            return <AnimatedDot key={step} isActive={isActive} isCompleted={isCompleted} />;
          })}
        </DotsRow>
      </DotsRowWrapper>
      <LabelsRow>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);

          return (
            <StepLabel key={step} $isActive={isActive} $isCompleted={isCompleted}>
              {step.replace('Group ', '')}
            </StepLabel>
          );
        })}
      </LabelsRow>
    </DotsContainer>
  );
};

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  if (props.variant === 'dots') {
    return (
      <DotsVariant
        steps={props.steps}
        currentStep={props.currentStep}
        completedSteps={props.completedSteps}
        style={props.style}
      />
    );
  }

  return (
    <BarVariant
      currentStep={props.currentStep}
      totalSteps={props.totalSteps}
      showStepText={(props as BarProgressIndicatorProps).showStepText}
    />
  );
};
