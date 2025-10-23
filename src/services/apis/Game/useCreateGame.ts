import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { CreateGameRequest, CreateGameResponse } from './types';

// API Function
export const createGame = async (gameData: CreateGameRequest): Promise<CreateGameResponse> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-id': token,
      },
      body: JSON.stringify(gameData),
    });

    if (res.status !== 201) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to create game: ${res.status}`);
    }

    const data = await res.json();
    return data.data as CreateGameResponse;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};

/**
 * Hook to create a new game
 */
export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      // Invalidate games query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
