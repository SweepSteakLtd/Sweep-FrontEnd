import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { firebaseAuth } from '~/lib/firebase';
import type { RootStackParamList } from '~/navigation/types';
import { fetchUser } from '~/services/apis/User/useGetUser';
import { verifyGBG } from '~/services/apis/User/useVerifyGBG';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useSplash = () => {
  const navigation = useNavigation<NavigationProp>();
  const hasNavigated = useRef(false);
  const [isCheckingGBG, setIsCheckingGBG] = useState(false);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Prevent double navigation
      if (hasNavigated.current) return;

      try {
        // Wait for Firebase auth state to be ready
        await new Promise<void>((resolve) => {
          const unsubscribe = firebaseAuth.onAuthStateChanged(() => {
            unsubscribe();
            resolve();
          });
        });

        const currentUser = firebaseAuth.currentUser;

        // Not authenticated - go to login
        if (!currentUser) {
          hasNavigated.current = true;
          navigation.replace('Login');
          return;
        }

        // Fetch user profile
        const user = await fetchUser();

        // No profile - go to create profile
        if (!user) {
          hasNavigated.current = true;
          navigation.replace('CreateProfile');
          return;
        }

        // User is verified - go to dashboard
        if (user.is_identity_verified === true) {
          hasNavigated.current = true;
          navigation.replace('Dashboard');
          return;
        }

        // User is not verified - check GBG status
        if (user.kyc_instance_id) {
          setIsCheckingGBG(true);

          try {
            const gbgResult = await verifyGBG(user.kyc_instance_id);
            hasNavigated.current = true;

            if (gbgResult.status === 'PASS') {
              navigation.replace('Dashboard');
            } else {
              // IN_PROGRESS, FAIL, MANUAL - show verification pending
              navigation.replace('VerificationPending');
            }
          } catch {
            // Server error - show verification pending with error
            hasNavigated.current = true;
            navigation.replace('VerificationPending');
          }
        } else {
          // No kyc_instance_id - verification failed, show error
          hasNavigated.current = true;
          navigation.replace('VerificationPending');
        }
      } catch (error) {
        console.error('[Splash] Error during auth check:', error);
        // On any error, go to login
        if (!hasNavigated.current) {
          hasNavigated.current = true;
          navigation.replace('Login');
        }
      }
    };

    checkAuthAndNavigate();
  }, [navigation]);

  return {
    isCheckingGBG,
  };
};
