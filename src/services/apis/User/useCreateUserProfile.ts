import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { User } from './types';
import { userQueryKeys } from './useGetUser';

export interface CreateUserProfileParams {
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_picture?: string;
  phone_number?: string;
  deposit_limit?: number;
  betting_limit?: number;
}

// API Function
const createUserProfile = async (params: CreateUserProfileParams): Promise<User> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-id': token || '',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create profile' }));
    throw new Error(error.message || 'Failed to create profile');
  }

  return response.json();
};

/**
 * Hook to update user profile via PUT /api/users/me
 */
export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserProfile,
    onSuccess: () => {
      // Invalidate user query to refetch updated data
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
    },
  });
};
