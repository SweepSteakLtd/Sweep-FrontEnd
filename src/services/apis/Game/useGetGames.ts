import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { Game, GamesResponse } from './types';

interface FetchGamesParams {
  searchTerm?: string;
  tournamentId?: string;
}

// Query Keys
export const gameQueryKeys = {
  games: (params?: FetchGamesParams) => ['games', params] as const,
  game: (id: string) => ['games', id] as const,
};

// API Function - exported for use outside of hook
export const fetchGames = async (params?: FetchGamesParams): Promise<Game[]> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    // Build query params
    const queryParams = new URLSearchParams();
    if (params?.searchTerm) {
      queryParams.append('search_term', params.searchTerm);
    }
    if (params?.tournamentId) {
      queryParams.append('tournament_id', params.tournamentId);
    }

    const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/games${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-id': token },
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch games: ${res.status}`);
    }

    const data = (await res.json()) as GamesResponse;
    return data.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

/**
 * Hook to fetch all games with optional search and filters
 */
export const useGetGames = (params?: FetchGamesParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: gameQueryKeys.games(params),
    queryFn: () => fetchGames(params),
    enabled: enabled && !!firebaseAuth.currentUser,
  });
};
