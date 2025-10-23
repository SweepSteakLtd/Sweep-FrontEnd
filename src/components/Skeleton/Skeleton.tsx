import { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

interface SkeletonItemProps extends ViewStyle {
  children?: React.ReactNode;
}

const SkeletonBox = ({ width = '100%', height = 20, borderRadius = 4, style }: SkeletonProps) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(1, { duration: 800 }), withTiming(0.3, { duration: 800 })),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        // @ts-expect-error - React Native Animated.View style types don't properly handle number | string for width/height
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#d0d0d0',
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

const SkeletonItem = ({ children, ...style }: SkeletonItemProps) => {
  return <View style={style}>{children}</View>;
};

export const Skeleton = Object.assign(SkeletonBox, {
  Item: SkeletonItem,
});
