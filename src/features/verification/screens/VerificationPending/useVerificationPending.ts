import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useGBGVerification } from '~/features/create-profile/hooks/useGBGVerification';
import type { RootStackParamList } from '~/navigation/types';
import { useDeleteUser } from '~/services/apis/User/useDeleteUser';
import { useGetUser, userQueryKeys } from '~/services/apis/User/useGetUser';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Hook for VerificationPending screen
 *
 * This screen is shown when:
 * - GBG verification is IN_PROGRESS (shows loading hourglass)
 * - GBG verification has FAILED or needs MANUAL review (shows error)
 * - Server error occurred while checking GBG (shows error)
 *
 * The initial GBG check happens in the Splash screen.
 * This hook handles ongoing polling when status is IN_PROGRESS.
 */
export const useVerificationPending = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { isPending: isDeleting, handleDeleteAccount } = useDeleteUser();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const gbgVerification = useGBGVerification();

  // If user is already verified, navigate to Dashboard
  useEffect(() => {
    if (!isUserLoading && user?.is_identity_verified === true) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, [isUserLoading, user?.is_identity_verified, navigation]);

  // Start GBG polling if user is not verified but has a kyc_instance_id
  // This continues polling after Splash navigated here with IN_PROGRESS status
  useEffect(() => {
    if (
      !isUserLoading &&
      user &&
      user.is_identity_verified === false &&
      user.kyc_instance_id &&
      !gbgVerification.isPolling &&
      !gbgVerification.result.status
    ) {
      // Continue polling with delay (Splash already did immediate check)
      gbgVerification.startPolling(user.kyc_instance_id);
    }
  }, [isUserLoading, user, gbgVerification]);

  // Handle GBG verification result
  useEffect(() => {
    const { status } = gbgVerification.result;

    if (!status) return;

    if (status === 'PASS') {
      // Verification passed - invalidate user query and navigate to dashboard
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
    // MANUAL and FAIL will show the error state (stop polling happens in the hook)
  }, [gbgVerification.result, navigation, queryClient]);

  // Show loading while:
  // - User data is loading
  // - GBG polling is in progress
  // - User has kyc_instance_id but no result yet (waiting to start polling)
  // - GBG status is IN_PROGRESS
  const hasPendingVerification =
    user?.is_identity_verified === false && user?.kyc_instance_id && !gbgVerification.result.status;

  const isVerifying =
    isUserLoading ||
    gbgVerification.isPolling ||
    hasPendingVerification ||
    gbgVerification.result.status === 'IN_PROGRESS';

  // Server error (failed to fetch) vs actual verification failure
  const isServerError = gbgVerification.result.error?.includes('Failed to fetch');

  const errorMessage =
    gbgVerification.result.error || 'Identity verification failed. Please contact support.';

  const handleRetry = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return {
    isVerifying,
    isServerError,
    isDeleting,
    errorMessage,
    handleDeleteAccount,
    handleRetry,
  };
};
