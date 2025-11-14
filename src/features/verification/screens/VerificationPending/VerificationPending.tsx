import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ErrorState } from '~/features/create-profile/components/ErrorState/ErrorState';
import type { RootStackParamList } from '~/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * VerificationPending screen shows when user's identity verification has failed
 * Simple error state - no polling, just shows error message
 */
export const VerificationPending = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleRetry = () => {
    // Redirect to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ErrorState
      errorMessage="Identity verification failed. Please contact support."
      onRetry={handleRetry}
    />
  );
};
