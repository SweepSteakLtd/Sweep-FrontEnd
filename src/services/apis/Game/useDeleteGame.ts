import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';

// API Function
export const deleteGame = async (gameId: string): Promise<void> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-id': token,
      },
    });

    if (res.status !== 204 && res.status !== 200) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to delete game: ${res.status}`);
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    throw error;
  }
};

/**
 * Hook to delete a game
 */
export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      // Invalidate games query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
