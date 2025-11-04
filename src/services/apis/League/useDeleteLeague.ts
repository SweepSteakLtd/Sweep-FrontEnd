import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';

// API Function
export const deleteLeague = async (leagueId: string): Promise<void> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/leagues/${leagueId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-id': token,
      },
    });

    if (res.status !== 204 && res.status !== 200) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to delete league: ${res.status}`);
    }
  } catch (error) {
    console.error('Error deleting league:', error);
    throw error;
  }
};

/**
 * Hook to delete a league
 */
export const useDeleteLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeague,
    onSuccess: () => {
      // Invalidate leagues query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });
};
