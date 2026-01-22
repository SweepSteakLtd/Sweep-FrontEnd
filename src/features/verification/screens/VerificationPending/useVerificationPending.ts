import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGBGVerification } from '~/features/create-profile/hooks/useGBGVerification';
import type { RootStackParamList, RootStackScreenProps } from '~/navigation/types';
import { useDeleteUser } from '~/services/apis/User/useDeleteUser';
import { useGetUser, userQueryKeys } from '~/services/apis/User/useGetUser';
import { verifyGBG } from '~/services/apis/User/useVerifyGBG';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RootStackScreenProps<'VerificationPending'>['route'];

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
  const route = useRoute<RouteProps>();
  const queryClient = useQueryClient();
  const { isPending: isDeleting, handleDeleteAccount } = useDeleteUser();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { startPolling, stopPolling, result, isPolling } = useGBGVerification();

  // Track if we've navigated away to prevent restarting polling
  const hasNavigatedAwayRef = useRef(false);
  const fromDocumentUpload = route.params?.fromDocumentUpload ?? false;
  const [isRetrying, setIsRetrying] = useState(false);

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
    if (!isUserLoading && user) {
      console.log('[VerificationPending] User data loaded:', JSON.stringify(user, null, 2));
    }

    if (!isUserLoading && user?.is_identity_verified === true) {
      console.log('[VerificationPending] User is verified, navigating to Dashboard');
      hasNavigatedAwayRef.current = true;
      stopPolling();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, [isUserLoading, user, navigation, stopPolling]);

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
      // If coming from document upload, retry 8 times with 8-second intervals
      if (fromDocumentUpload) {
        console.log(
          '[VerificationPending] Coming from document upload, starting retry logic (8 attempts with 8s intervals)',
        );
        setIsRetrying(true);

        let attemptCount = 0;
        const MAX_ATTEMPTS = 8;
        const RETRY_DELAY = 8000; // 8 seconds

        const checkStatus = async () => {
          attemptCount++;
          console.log(`[VerificationPending] Attempt ${attemptCount}/${MAX_ATTEMPTS}`);

          try {
            const response = await verifyGBG(user.kyc_instance_id!);
            console.log(
              `[VerificationPending] Attempt ${attemptCount} - Full GBG response:`,
              JSON.stringify(response, null, 2),
            );

            // If we get a definitive status (PASS, FAIL, or IN_PROGRESS), handle it
            if (response.status === 'PASS') {
              console.log('[VerificationPending] Got PASS status - navigating to Dashboard');
              setIsRetrying(false);
              hasNavigatedAwayRef.current = true;
              queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              });
              return;
            }

            if (response.status === 'FAIL') {
              console.log('[VerificationPending] Got FAIL status - showing error');
              setIsRetrying(false);
              // Start normal polling to handle FAIL state
              startPolling(user.kyc_instance_id!, { immediate: true });
              return;
            }

            if (response.status === 'IN_PROGRESS') {
              console.log('[VerificationPending] Got IN_PROGRESS - starting normal polling');
              setIsRetrying(false);
              // Start normal polling to continue checking
              startPolling(user.kyc_instance_id!, { immediate: true });
              return;
            }

            // If status is MANUAL and we haven't reached max attempts, retry
            if (response.status === 'MANUAL' && attemptCount < MAX_ATTEMPTS) {
              console.log(
                `[VerificationPending] Still MANUAL, waiting ${RETRY_DELAY}ms before retry...`,
              );
              setTimeout(() => {
                if (!hasNavigatedAwayRef.current) {
                  checkStatus();
                }
              }, RETRY_DELAY);
              return;
            }

            // If we've exhausted all retries and still MANUAL, navigate to DocumentUpload
            if (response.status === 'MANUAL' && attemptCount >= MAX_ATTEMPTS) {
              console.log(
                '[VerificationPending] Still MANUAL after 8 attempts - navigating to DocumentUpload',
              );
              setIsRetrying(false);
              hasNavigatedAwayRef.current = true;
              navigation.navigate('DocumentUpload');
              return;
            }
          } catch (error) {
            console.error('[VerificationPending] Error checking status:', error);
            // On error, try again if we have attempts left
            if (attemptCount < MAX_ATTEMPTS) {
              console.log('[VerificationPending] Error, retrying...');
              setTimeout(() => {
                if (!hasNavigatedAwayRef.current) {
                  checkStatus();
                }
              }, RETRY_DELAY);
            } else {
              // After max attempts with errors, start normal polling to handle error state
              console.log(
                '[VerificationPending] Error after max attempts - starting normal polling',
              );
              setIsRetrying(false);
              startPolling(user.kyc_instance_id!, { immediate: true });
            }
          }
        };

        // Start first check after initial delay
        const initialTimeout = setTimeout(() => {
          if (!hasNavigatedAwayRef.current) {
            checkStatus();
          }
        }, RETRY_DELAY);

        return () => {
          clearTimeout(initialTimeout);
          setIsRetrying(false);
        };
      } else {
        // Poll immediately - no delay needed when checking status
        startPolling(user.kyc_instance_id, { immediate: true });
        return undefined;
      }
    }
    return undefined;
  }, [
    isUserLoading,
    user,
    isPolling,
    result.status,
    startPolling,
    fromDocumentUpload,
    navigation,
    queryClient,
  ]);

  // Handle GBG verification result
  useEffect(() => {
    const { status } = result;

    if (!status) return;

    console.log(
      '[VerificationPending] Received GBG result from polling:',
      JSON.stringify(result, null, 2),
    );

    if (status === 'PASS') {
      // Verification passed - stop polling, invalidate user query and navigate to dashboard
      console.log('[VerificationPending] Status PASS - navigating to Dashboard');
      hasNavigatedAwayRef.current = true;
      stopPolling();
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } else if (status === 'MANUAL') {
      // Manual verification required - stop polling and navigate to document upload
      console.log('[VerificationPending] Status MANUAL - navigating to DocumentUpload');
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
  // - Retrying status checks (3 attempts)
  const hasPendingVerification =
    user?.is_identity_verified === false && user?.kyc_instance_id && !result.status;

  const isVerifying =
    isUserLoading ||
    isPolling ||
    isRetrying ||
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
