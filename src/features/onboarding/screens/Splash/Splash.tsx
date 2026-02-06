import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { Container, LogoContainer } from './styles';
import { useSplash } from './useSplash';

const chipinLogo = require('../../../../../assets/ChipInLogo.jpg');

export const Splash = () => {
  // Handle auth check and navigation
  useSplash();

  const theme = useTheme();

  // Reanimated shared values for zoom animation
  const scale = useSharedValue(1);

  useEffect(() => {
    // Slow zoom in and out animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Container>
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
          translucent={false}
        />
      )}
      <LogoContainer>
        <Animated.Image
          source={chipinLogo}
          resizeMode="contain"
          style={[{ width: 200, height: 200 }, animatedStyle]}
        />
      </LogoContainer>
    </Container>
  );
};
