import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { League } from './types';

interface FetchLeaguesParams {
  searchTerm?: string;
  tournamentId?: string;
}

// Query Keys
export const leagueQueryKeys = {
  leagues: (params?: FetchLeaguesParams) => ['games', params] as const,
  league: (id: string) => ['games', id] as const,
};

// API Function - exported for use outside of hook
export const fetchLeagues = async (params?: FetchLeaguesParams): Promise<League[]> => {
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
      throw new Error(`Failed to fetch leagues: ${res.status}`);
    }

    const data = (await res.json()) as { data: League[] };
    return data.data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

/**
 * Hook to fetch all leagues with optional search and filters
 */
export const useGetLeagues = (params?: FetchLeaguesParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: leagueQueryKeys.leagues(params),
    queryFn: () => fetchLeagues(params),
    enabled: enabled && !!firebaseAuth.currentUser,
  });
};
