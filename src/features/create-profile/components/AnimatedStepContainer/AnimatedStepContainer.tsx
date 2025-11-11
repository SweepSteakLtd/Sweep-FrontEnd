import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AnimatedStepContainerProps {
  children: React.ReactNode;
  isActive: boolean;
  style?: ViewStyle;
}

export const AnimatedStepContainer = ({
  children,
  isActive,
  style,
}: AnimatedStepContainerProps) => {
  const opacity = useSharedValue(isActive ? 1 : 0);
  const translateX = useSharedValue(isActive ? 0 : 50);

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0, { duration: 300 });
    translateX.value = withTiming(isActive ? 0 : 50, { duration: 300 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  // Only render the active step
  if (!isActive) {
    return null;
  }

  return (
    <Animated.View style={[{ width: '100%' }, style, animatedStyle]}>{children}</Animated.View>
  );
};
