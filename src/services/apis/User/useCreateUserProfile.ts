import { useMutation } from '@tanstack/react-query';
import { api } from '../apiClient';
import { UserResponse } from './types';

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
const createUserProfile = async (params: CreateUserProfileParams): Promise<UserResponse> => {
  return api.post<UserResponse>('/api/users', params, undefined, 20000); // 20 second timeout
};

/**
 * Hook to create user profile via POST /api/users
 *
 * Note: Does NOT invalidate user query on success - this is handled by the caller
 * after GBG verification polling completes to prevent premature navigation
 */
export const useCreateUserProfile = () => {
  return useMutation({
    mutationFn: createUserProfile,
  });
};
