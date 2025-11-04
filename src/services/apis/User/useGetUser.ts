import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { api } from '../apiClient';
import { User } from './types';

// Query Keys
export const userQueryKeys = {
  user: ['user'] as const,
};

// API Function - exported for use outside of hook
export const fetchUser = async (): Promise<User | null> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    return null;
  }

  try {
    // allow404 returns null if user doesn't exist (expected for new users)
    const data = await api.get<{ data: User }>('/api/users/me', { allow404: true });
    return data?.data ?? null;
  } catch (error) {
    // Re-throw the error so the caller can handle it appropriately
    // Network errors, 500s, etc. should not be treated as "user doesn't exist"
    throw error;
  }
};

/**
 * Hook to fetch the current user
 *
 * Note: This hook will throw errors for server failures (500, network issues, etc.)
 * Only 404 responses return null (user profile doesn't exist)
 *
 * When used in UI components, React Query will automatically handle retries
 * and you can check the error state to show appropriate UI
 */
export const useGetUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: userQueryKeys.user,
    queryFn: fetchUser,
    enabled: enabled && !!firebaseAuth.currentUser, // Only fetch if user is authenticated
    retry: 3, // Retry failed requests 3 times (helps with transient network issues)
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};
