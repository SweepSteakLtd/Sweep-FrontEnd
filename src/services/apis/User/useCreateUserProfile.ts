import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
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
  return api.post<User>('/api/users', params);
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
