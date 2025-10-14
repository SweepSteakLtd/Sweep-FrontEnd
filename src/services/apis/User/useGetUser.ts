import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { User } from './types';

// Query Keys
export const userQueryKeys = {
  user: ['user'] as const,
};

// API Function
async function fetchUser(): Promise<User | null> {
  const token = await firebaseAuth.currentUser?.getIdToken();
  if (!token) return null;

  const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-id': token },
  });

  if (res.status !== 200) return null;

  const data = (await res.json()).data as User;
  console.log('Fetched user:', data);
  return data;
}

/**
 * Hook to fetch the current user
 */
export function useGetUser() {
  return useQuery({
    queryKey: userQueryKeys.user,
    queryFn: fetchUser,
    enabled: !!firebaseAuth.currentUser, // Only fetch if user is authenticated
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}
