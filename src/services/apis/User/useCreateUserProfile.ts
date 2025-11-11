import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import { User } from './types';
import { userQueryKeys } from './useGetUser';

export interface CreateUserProfileParams {
  first_name: string;
  last_name: string;
  nickname?: string;
  phone_number: string;
  date_of_birth: string; // yyyy-mm-dd format
  bio?: string;
  profile_picture?: string;
  deposit_limit?: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  betting_limit?: number;
  address: {
    line1: string;
    line2?: string;
    line3?: string;
    town: string;
    county?: string;
    postcode: string;
    country: string;
  };
}

// API Function - Profile creation can take 10-15 seconds
const createUserProfile = async (params: CreateUserProfileParams): Promise<User> => {
  return api.post<User>('/api/users', params, undefined, 20000); // 20 second timeout
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
