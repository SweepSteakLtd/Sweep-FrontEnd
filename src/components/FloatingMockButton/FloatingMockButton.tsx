import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { Icon } from '~/components/Icon/Icon';
import type { RootStackParamList } from '~/navigation/types';
import { FloatingButton } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const STORAGE_KEY = '@floating_mock_button_position';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BUTTON_SIZE = 56;

export const FloatingMockButton = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);

  // Only show in development
  if (!__DEV__) {
    return null;
  }

  const translateX = useSharedValue(SCREEN_WIDTH - BUTTON_SIZE - 20);
  const translateY = useSharedValue(SCREEN_HEIGHT - BUTTON_SIZE - 30);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  useEffect(() => {
    // Load saved position on mount
    const loadPosition = async () => {
      try {
        const savedPosition = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedPosition) {
          const { x, y } = JSON.parse(savedPosition);
          translateX.value = x;
          translateY.value = y;
        }
      } catch (error) {
        console.log('[FloatingMockButton]: Failed to load position', error);
      } finally {
        setIsReady(true);
      }
    };

    loadPosition();
  }, []);

  const savePosition = async (x: number, y: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ x, y }));
    } catch (error) {
      console.log('[FloatingMockButton]: Failed to save position', error);
    }
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(navigateToSettings)();
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      // Clamp Y to screen bounds
      const clampedY = Math.max(0, Math.min(translateY.value, SCREEN_HEIGHT - BUTTON_SIZE));

      // Snap X to nearest edge (left or right)
      const midpoint = SCREEN_WIDTH / 2;
      const snapX = translateX.value < midpoint ? 20 : SCREEN_WIDTH - BUTTON_SIZE - 20;

      // Animate with spring
      translateX.value = withSpring(snapX, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(clampedY, { damping: 15, stiffness: 150 });

      // Save position
      runOnJS(savePosition)(snapX, clampedY);
    });

  const composedGesture = Gesture.Race(tapGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  if (!isReady) {
    return null;
  }

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 9999,
          },
          animatedStyle,
        ]}
      >
        <FloatingButton backgroundColor={theme.colors.primary}>
          <Icon name="⚙️" size={24} />
        </FloatingButton>
      </Animated.View>
    </GestureDetector>
  );
};
