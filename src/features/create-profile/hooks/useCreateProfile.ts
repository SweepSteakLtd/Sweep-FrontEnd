import { useState } from 'react';
import { UserResponse } from '~/services/apis/User/types';
import {
  CreateUserProfileParams,
  useCreateUserProfile,
} from '~/services/apis/User/useCreateUserProfile';

export interface CreateProfileResult {
  success: boolean;
  error?: string;
  user?: UserResponse;
}

export const useCreateProfile = () => {
  const createProfileMutation = useCreateUserProfile();
  const [loading, setLoading] = useState(false);

  const createProfile = async (
    profileData: CreateUserProfileParams,
  ): Promise<CreateProfileResult> => {
    setLoading(true);

    try {
      const user = await createProfileMutation.mutateAsync(profileData);
      // DON'T invalidate user query here - let the GBG verification polling complete first
      // The query will be invalidated when the user navigates away or verification completes
      setLoading(false);
      return { success: true, user };
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
