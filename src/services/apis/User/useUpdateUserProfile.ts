import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { User } from './types';
import { userQueryKeys } from './useGetUser';

export interface UpdateUserProfileParams {
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_picture?: string;
  phone_number?: string;
  deposit_limit?: number;
  betting_limit?: number;
}

// API Function
async function updateUserProfile(params: UpdateUserProfileParams): Promise<User> {
  const token = await firebaseAuth.currentUser?.getIdToken();

  const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/me`, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-id': token || '',
    },
  });
  console.log('[DEBUG]: URL:', `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/me`);
  console.log('[DEBUG]: updateUserProfile request body:', JSON.stringify(params));
  console.log('[DEBUG]: updateUserProfile response status:', response.status);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update profile' }));
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
}

/**
 * Hook to update user profile via PUT /api/users/me
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // Invalidate user query to refetch updated data
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
    },
  });
}
