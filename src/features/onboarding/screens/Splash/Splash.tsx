import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
<<<<<<< HEAD
import { Icon } from '~/components/Icon/Icon';
=======
>>>>>>> update-chipin-branding
import { firebaseAuth } from '~/lib/firebase';
import type { RootStackParamList } from '~/navigation/types';
import { ApiError } from '~/services/apis/apiClient';
import { fetchUser, userQueryKeys } from '~/services/apis/User/useGetUser';
<<<<<<< HEAD
import { AppName, Container, GoldCircle, LogoContainer } from './styles';
=======
import { Container, LogoContainer, LogoImage } from './styles';

const chipinLogo = require('../../../../../assets/Chipin1.png');
>>>>>>> update-chipin-branding

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Splash = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();

<<<<<<< HEAD
  // Reanimated shared values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Pulsing scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1, // Infinite
      false,
    );

    // Subtle rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1, // Infinite
=======
  // Reanimated shared values for zoom animation
  const scale = useSharedValue(1);

  useEffect(() => {
    // Slow zoom in and out animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 3000, easing: Easing.inOut(Easing.ease) }), // Zoom in over 3 seconds
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }), // Zoom out over 3 seconds
      ),
      -1, // Infinite loop
>>>>>>> update-chipin-branding
      false,
    );
  }, []);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Wait for Firebase to check persisted auth state
      const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
        let targetScreen: keyof RootStackParamList;

        if (user) {
          // User is authenticated - check if they have a profile using React Query
          try {
            const userData = await queryClient.fetchQuery({
              queryKey: userQueryKeys.user,
              queryFn: fetchUser,
            });

            if (!userData) {
              // No profile exists (404) - go to CreateProfile
              targetScreen = 'CreateProfile';
            } else if (userData.is_identity_verified === false) {
              // Profile exists but not verified - go to VerificationPending
              targetScreen = 'VerificationPending';
            } else {
              // Profile exists and verified - go to Dashboard
              targetScreen = 'Dashboard';
            }
          } catch (error) {
            console.error('[DEBUG]: Failed to check user profile:', error);
            // Only sign out for 401 Unauthorized errors
            // For network errors, 500s, etc., let them through to Dashboard
            if (error instanceof ApiError && error.status === 401) {
              await firebaseAuth.signOut();
              targetScreen = 'Login';
            } else {
              // For other errors (network, 500, etc.), still go to Dashboard
              // The dashboard can show an error state if needed
              targetScreen = 'Dashboard';
            }
          }
        } else {
          // Not authenticated - go to Login
          targetScreen = 'Login';
        }

        // Navigate immediately once ready
        navigation.replace(targetScreen);

        // Clean up listener after first check
        unsubscribe();
      });
    };

    checkAuthAndNavigate();
  }, [navigation, queryClient]);

  const animatedStyle = useAnimatedStyle(() => ({
<<<<<<< HEAD
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Container>
      <LogoContainer>
        <Animated.View style={animatedStyle}>
          <GoldCircle>
            <Icon name="⛳" size={40} />
          </GoldCircle>
        </Animated.View>
        <AppName>Sweepsteak</AppName>
=======
    transform: [{ scale: scale.value }],
  }));

  const AnimatedImage = Animated.createAnimatedComponent(LogoImage);

  return (
    <Container>
      <LogoContainer>
        <AnimatedImage source={chipinLogo} resizeMode="contain" style={animatedStyle} />
>>>>>>> update-chipin-branding
      </LogoContainer>
    </Container>
  );
};
