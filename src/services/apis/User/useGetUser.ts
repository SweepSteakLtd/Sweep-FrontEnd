import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
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
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-id': token },
    });

    // 404 means user profile doesn't exist - this is expected for new users
    if (res.status === 404) {
      return null;
    }

    // Any other non-200 status (like 500 server error) should throw an error
    // so the caller knows something went wrong vs user simply not existing
    if (res.status !== 200) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch user: ${res.status} - ${errorText}`);
    }

    const data = (await res.json()).data as User;
    return data;
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
