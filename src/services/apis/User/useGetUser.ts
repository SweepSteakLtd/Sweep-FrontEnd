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

    if (res.status !== 200) {
      return null;
    }

    const data = (await res.json()).data as User;
    return data;
  } catch (error) {
    return null;
  }
};

/**
 * Hook to fetch the current user
 */
export const useGetUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: userQueryKeys.user,
    queryFn: fetchUser,
    enabled: enabled && !!firebaseAuth.currentUser, // Only fetch if user is authenticated
  });
};
