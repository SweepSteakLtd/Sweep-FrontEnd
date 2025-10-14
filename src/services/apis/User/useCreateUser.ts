import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { User } from './types';
import { userQueryKeys } from './useGetUser';

// API Function
async function createUser(
  body: Pick<User, 'first_name' | 'last_name' | 'email' | 'phone_number'>,
): Promise<Response> {
  const token = await firebaseAuth.currentUser?.getIdToken();
  return fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', 'x-auth-id': token || '' },
  });
}

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate user query to refetch
      queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
    },
  });
}
