import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { useAuth } from '~/contexts/AuthContext';
import type { RootStackParamList } from '~/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * AuthGuard monitors authentication state and handles navigation
 * when the user becomes unauthenticated (e.g., token expiry)
 */
export const AuthGuard = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isAuthenticated } = useAuth();
  const previouslyAuthenticated = useRef(false);

  useEffect(() => {
    // If user was authenticated but is now not authenticated
    // (token expired, signed out remotely, etc.)
    if (previouslyAuthenticated.current && !isAuthenticated) {
      // Navigate back to Login and clear stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }

    // Update the ref to current authentication state
    previouslyAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, navigation]);

  // This component doesn't render anything
  return null;
};
