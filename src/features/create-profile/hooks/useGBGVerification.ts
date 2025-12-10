import { useCallback, useEffect, useRef, useState } from 'react';
import { GBGVerificationStatus, verifyGBG } from '~/services/apis/User/useVerifyGBG';

export interface GBGVerificationResult {
  status: GBGVerificationStatus | null;
  error?: string;
}

export interface StartPollingOptions {
  immediate?: boolean; // Poll immediately without initial delay
  retryOnError?: boolean; // Retry on server errors (default: true)
}

export interface UseGBGVerificationReturn {
  startPolling: (instanceId: string, options?: StartPollingOptions) => void;
  stopPolling: () => void;
  resetResult: () => void;
  result: GBGVerificationResult;
  isPolling: boolean;
}

/**
 * Hook for polling GBG verification status with custom retry logic:
 * - First check after 5 seconds
 * - Second check after 3 seconds
 * - Third check after 2 seconds
 * - Subsequent checks every 2 seconds
 *
 * Stops polling when:
 * - Status is PASS (success)
 * - Status is MANUAL or FAIL (error)
 * - Maximum attempts reached (15 attempts)
 * - Server errors after 3 retries
 */
export const useGBGVerification = (): UseGBGVerificationReturn => {
  const [isPolling, setIsPolling] = useState(false);
  const [result, setResult] = useState<GBGVerificationResult>({ status: null });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const attemptCountRef = useRef(0);
  const errorRetryCountRef = useRef(0);
  const instanceIdRef = useRef<string | null>(null);
  const retryOnErrorRef = useRef(true);

  const MAX_ATTEMPTS = 15;
  const MAX_ERROR_RETRIES = 3;

  const getNextDelay = (attempt: number): number => {
    if (attempt === 0) return 5000; // First check after 5 seconds
    if (attempt === 1) return 3000; // Second check after 3 seconds
    return 2000; // All subsequent checks every 2 seconds
  };

  const poll = useCallback(async () => {
    const instanceId = instanceIdRef.current;
    if (!instanceId) {
      return;
    }

    const currentAttempt = attemptCountRef.current + 1;

    // Check if max attempts reached
    if (currentAttempt > MAX_ATTEMPTS) {
      setIsPolling(false);
      setResult({
        status: 'FAIL',
        error: 'Verification timeout. Please try again or contact support.',
      });
      return;
    }

    try {
      const response = await verifyGBG(instanceId);
      const status = response.status;

      setResult({ status });

      // Stop polling on terminal states
      if (status === 'PASS') {
        setIsPolling(false);
        return;
      }

      if (status === 'MANUAL' || status === 'FAIL') {
        setIsPolling(false);
        setResult({
          status,
          error:
            status === 'MANUAL'
              ? 'Manual verification required. Please contact support.'
              : 'Identity verification failed. Please try again or contact support.',
        });
        return;
      }

      // Continue polling for IN_PROGRESS
      if (status === 'IN_PROGRESS') {
        attemptCountRef.current += 1;
        const nextDelay = getNextDelay(attemptCountRef.current);

        timeoutRef.current = setTimeout(() => {
          poll();
        }, nextDelay);
      }
    } catch (error) {
      // If retryOnError is false, show error immediately
      if (!retryOnErrorRef.current) {
        setIsPolling(false);
        setResult({
          status: 'FAIL',
          error: 'Failed to fetch your verification status. Please try again later.',
        });
        return;
      }

      // Track error retries separately - stop after MAX_ERROR_RETRIES
      errorRetryCountRef.current += 1;

      if (errorRetryCountRef.current >= MAX_ERROR_RETRIES) {
        setIsPolling(false);
        setResult({
          status: 'FAIL',
          error: 'Failed to fetch your verification status. Please try again later.',
        });
        return;
      }

      // Continue trying
      attemptCountRef.current += 1;
      const nextDelay = getNextDelay(attemptCountRef.current);

      timeoutRef.current = setTimeout(() => {
        poll();
      }, nextDelay);
    }
  }, []);

  const startPolling = useCallback(
    (instanceId: string, options?: StartPollingOptions) => {
      const { immediate = false, retryOnError = true } = options || {};

      // Reset state
      instanceIdRef.current = instanceId;
      attemptCountRef.current = 0;
      errorRetryCountRef.current = 0;
      retryOnErrorRef.current = retryOnError;
      setIsPolling(true);
      setResult({ status: null });

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (immediate) {
        // Poll immediately
        poll();
      } else {
        // Start first poll after initial delay
        const initialDelay = getNextDelay(0);
        timeoutRef.current = setTimeout(() => {
          poll();
        }, initialDelay);
      }
    },
    [poll],
  );

  const stopPolling = useCallback(() => {
    setIsPolling(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetResult = useCallback(() => {
    setResult({ status: null });
    attemptCountRef.current = 0;
    errorRetryCountRef.current = 0;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    startPolling,
    stopPolling,
    resetResult,
    result,
    isPolling,
  };
};
