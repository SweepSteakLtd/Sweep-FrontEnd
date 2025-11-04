import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { CreateLeagueRequest, CreateLeagueResponse } from './types';

// API Function
export const createLeague = async (
  leagueData: CreateLeagueRequest,
): Promise<CreateLeagueResponse> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/leagues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-id': token,
      },
      body: JSON.stringify(leagueData),
    });

    if (res.status !== 201) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Failed to create league: ${res.status}`);
    }

    const data = await res.json();
    return data.data as CreateLeagueResponse;
  } catch (error) {
    console.error('Error creating league:', error);
    throw error;
  }
};

/**
 * Hook to create a new league
 */
export const useCreateLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLeague,
    onSuccess: () => {
      // Invalidate leagues query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });
};
