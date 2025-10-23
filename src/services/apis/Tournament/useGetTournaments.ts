import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { tournamentsResponseSchema, type Tournament } from '../schemas';

// Query Keys
export const tournamentQueryKeys = {
  tournaments: ['tournaments'] as const,
  tournament: (id: string) => ['tournaments', id] as const,
};

// API Function - exported for use outside of hook
export const fetchTournaments = async (): Promise<Tournament[]> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/tournaments`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-id': token },
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch tournaments: ${res.status}`);
    }

    const rawData = await res.json();

    // Validate response with Zod
    const validationResult = tournamentsResponseSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.error('[fetchTournaments] Validation error:', validationResult.error.format());
      throw new Error('Invalid tournament data received from API');
    }

    return validationResult.data.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
};

/**
 * Hook to fetch all tournaments
 */
export const useGetTournaments = (enabled: boolean = true) => {
  return useQuery({
    queryKey: tournamentQueryKeys.tournaments,
    queryFn: fetchTournaments,
    enabled: enabled && !!firebaseAuth.currentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
