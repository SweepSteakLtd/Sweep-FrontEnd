import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Icon } from '~/components/Icon/Icon';
import { firebaseAuth } from '~/lib/firebase';
import { userQueryKeys, fetchUser } from '~/services/apis/User/useGetUser';
import type { RootStackParamList } from '~/navigation/types';
import { Container, LogoContainer, GoldCircle, AppName } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Splash = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();

  // Reanimated shared values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Pulsing scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite
      false
    );

    // Subtle rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1, // Infinite
      false
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

            targetScreen = userData ? 'Dashboard' : 'ProfileSetup';
          } catch (error) {
            console.error('[DEBUG]: Failed to check user profile:', error);
            targetScreen = 'ProfileSetup';
          }
        } else {
          // Not authenticated - go to Landing
          targetScreen = 'Landing';
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
      </LogoContainer>
    </Container>
  );
};
