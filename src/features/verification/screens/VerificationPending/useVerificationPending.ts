import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
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
  const { startPolling, stopPolling, result, isPolling } = useGBGVerification();

  // Track if we've navigated away to prevent restarting polling
  const hasNavigatedAwayRef = useRef(false);

  // Stop polling when screen loses focus, reset flag when focused
  useFocusEffect(
    useCallback(() => {
      // Screen is focused - reset the flag to allow polling
      hasNavigatedAwayRef.current = false;

      return () => {
        // Screen lost focus - stop polling and set flag
        hasNavigatedAwayRef.current = true;
        stopPolling();
      };
    }, [stopPolling]),
  );

  // If user is already verified, navigate to Dashboard
  useEffect(() => {
    if (!isUserLoading && user?.is_identity_verified === true) {
      hasNavigatedAwayRef.current = true;
      stopPolling();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, [isUserLoading, user?.is_identity_verified, navigation, stopPolling]);

  // Start GBG polling if user is not verified but has a kyc_instance_id
  // This continues polling after Splash navigated here with IN_PROGRESS status
  useEffect(() => {
    if (
      !hasNavigatedAwayRef.current &&
      !isUserLoading &&
      user &&
      user.is_identity_verified === false &&
      user.kyc_instance_id &&
      !isPolling &&
      !result.status
    ) {
      // Poll immediately - no delay needed when checking status
      startPolling(user.kyc_instance_id, { immediate: true });
    }
  }, [isUserLoading, user, isPolling, result.status, startPolling]);

  // Handle GBG verification result
  useEffect(() => {
    const { status } = result;

    if (!status) return;

    if (status === 'PASS') {
      // Verification passed - stop polling, invalidate user query and navigate to dashboard
      hasNavigatedAwayRef.current = true;
      stopPolling();
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } else if (status === 'MANUAL') {
      // Manual verification required - stop polling and navigate to document upload
      hasNavigatedAwayRef.current = true;
      stopPolling();
      navigation.navigate('DocumentUpload');
    }
    // FAIL will show the error state (stop polling happens in the hook)
  }, [result, navigation, queryClient, stopPolling]);

  // Show loading while:
  // - User data is loading
  // - GBG polling is in progress
  // - User has kyc_instance_id but no result yet (waiting to start polling)
  // - GBG status is IN_PROGRESS
  // - GBG status is MANUAL (navigating to document upload)
  const hasPendingVerification =
    user?.is_identity_verified === false && user?.kyc_instance_id && !result.status;

  const isVerifying =
    isUserLoading ||
    isPolling ||
    hasPendingVerification ||
    result.status === 'IN_PROGRESS' ||
    result.status === 'MANUAL';

  // Server error (failed to fetch) vs actual verification failure
  const isServerError = result.error?.includes('Failed to fetch');

  const errorMessage = result.error || 'Identity verification failed. Please contact support.';

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
