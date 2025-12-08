import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { api } from '../apiClient';
import { tournamentsResponseSchema, type Tournament } from '../schemas';

// Query Keys
export const tournamentQueryKeys = {
  tournaments: ['tournaments'] as const,
  tournament: (id: string) => ['tournaments', id] as const,
};

// API Function - exported for use outside of hook
export const fetchTournaments = async (): Promise<Tournament[]> => {
  try {
    const rawData = await api.get<{ data: Tournament[] }>('/api/tournaments');

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
  });
};
