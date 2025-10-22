import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import {
  CreateUserProfileParams,
  useCreateUserProfile,
} from '~/services/apis/User/useCreateUserProfile';
import { userQueryKeys } from '~/services/apis/User/useGetUser';

export const useCreateProfile = () => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const createProfileMutation = useCreateUserProfile();
  const [loading, setLoading] = useState(false);

  const createProfile = async (profileData: CreateUserProfileParams): Promise<boolean> => {
    setLoading(true);

    try {
      await createProfileMutation.mutateAsync(profileData);
      // Invalidate user query to trigger refetch
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      showAlert({
        title: 'Failed to create profile',
        message: error.message || 'Please try again.',
      });
      return false;
    }
  };

  return {
    createProfile,
    loading: loading || createProfileMutation.isPending,
  };
};
