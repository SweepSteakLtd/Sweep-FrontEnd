import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAlert } from '~/components/Alert/Alert';
import { useUpdateUserProfile, UpdateUserProfileParams } from '~/services/apis/User/useUpdateUserProfile';
import { userQueryKeys } from '~/services/apis/User/useGetUser';

export const useCreateProfile = () => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateUserProfile();
  const [loading, setLoading] = useState(false);

  const createProfile = async (profileData: UpdateUserProfileParams): Promise<boolean> => {
    setLoading(true);

    try {
      await updateProfileMutation.mutateAsync(profileData);
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
    loading: loading || updateProfileMutation.isPending,
  };
};
