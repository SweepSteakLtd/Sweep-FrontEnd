import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import { User } from './types';
import { userQueryKeys } from './useGetUser';

// Use Partial<User> to allow updating any user field
export type UpdateUserParams = Partial<User>;

// API Function
const updateUser = async (params: UpdateUserParams): Promise<User> => {
  const data = await api.put<{ data: User }>('/api/users/me', params);
  return data.data;
};

/**
 * Hook to update user profile via PUT /api/users/me
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // Invalidate user query to refetch updated data
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
    },
  });
};
