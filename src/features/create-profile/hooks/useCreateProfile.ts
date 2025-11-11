import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  CreateUserProfileParams,
  useCreateUserProfile,
} from '~/services/apis/User/useCreateUserProfile';
import { userQueryKeys } from '~/services/apis/User/useGetUser';

export interface CreateProfileResult {
  success: boolean;
  error?: string;
}

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const createProfileMutation = useCreateUserProfile();
  const [loading, setLoading] = useState(false);

  const createProfile = async (
    profileData: CreateUserProfileParams,
  ): Promise<CreateProfileResult> => {
    setLoading(true);

    try {
      await createProfileMutation.mutateAsync(profileData);
      // Invalidate user query to trigger refetch
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
      setLoading(false);
      return { success: true };
    } catch (error: unknown) {
      setLoading(false);
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  return {
    createProfile,
    loading: loading || createProfileMutation.isPending,
  };
};
