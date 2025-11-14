import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { useAuth } from '~/contexts/AuthContext';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * IdentityGuard monitors identity verification status and handles navigation
 * when the user needs to complete or is pending GBG verification
 */
export const IdentityGuard = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isAuthenticated } = useAuth();
  const { data: user, isLoading } = useGetUser(isAuthenticated);
  const hasCheckedVerification = useRef(false);

  // Check identity verification status
  useEffect(() => {
    if (!isAuthenticated || isLoading || !user || hasCheckedVerification.current) {
      return;
    }

    const isVerified = user.is_identity_verified === true;

    // If verified, allow user to proceed
    // If not verified, redirect to verification pending screen
    if (!isVerified) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'VerificationPending' }],
      });
    }

    // Mark that we've checked verification for this session
    hasCheckedVerification.current = true;
  }, [isAuthenticated, isLoading, user, navigation]);

  // Reset verification check when user logs out or logs in
  useEffect(() => {
    if (!isAuthenticated) {
      hasCheckedVerification.current = false;
    }
  }, [isAuthenticated]);

  // This component doesn't render anything
  return null;
};
