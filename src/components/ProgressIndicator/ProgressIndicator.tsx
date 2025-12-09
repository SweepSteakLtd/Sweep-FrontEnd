import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Reanimated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import {
  CheckMark,
  Connector,
  ConnectorFill,
  Container,
  DotsContainer,
  DotsRow,
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

  const bgColor = isCompleted ? theme.colors.primary : 'transparent';
  const borderCol = isActive || isCompleted ? theme.colors.primary : theme.colors.border;
  const size = isActive ? 28 : 22;

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

const AnimatedConnector = ({ isCompleted }: { isCompleted: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isCompleted ? '100%' : '0%', {
        damping: 20,
        stiffness: 100,
      }),
    };
  }, [isCompleted]);

  return (
    <Connector>
      <ConnectorFill style={animatedStyle} />
    </Connector>
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
  return (
    <DotsContainer style={style}>
      <DotsRow>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isLastStep = index === steps.length - 1;
          const isConnectorCompleted = completedSteps.includes(index);

          return (
            <React.Fragment key={step}>
              <AnimatedDot isActive={isActive} isCompleted={isCompleted} />
              {!isLastStep && <AnimatedConnector isCompleted={isConnectorCompleted} />}
            </React.Fragment>
          );
        })}
      </DotsRow>
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
