import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { api } from '../apiClient';
import { League } from './types';

interface FetchLeaguesParams {
  name?: string; // Pattern matching search (bypasses privacy filters) - use for private league search
  search_term?: string; // Case-insensitive search (respects privacy) - use for public league search
  tournament_id?: string;
  entry_fee?: string;
  owner_id?: string;
}

// Query Keys
export const leagueQueryKeys = {
  leagues: (params?: FetchLeaguesParams) => ['leagues', params] as const,
  league: (id: string) => ['leagues', id] as const,
};

// API Function - exported for use outside of hook
export const fetchLeagues = async (params?: FetchLeaguesParams): Promise<League[]> => {
  try {
    // Build query params
    const queryParams = new URLSearchParams();
    if (params?.name) {
      // 'name' parameter bypasses privacy filters - use for private league search
      queryParams.append('name', params.name);
    }
    if (params?.search_term) {
      // 'search_term' respects privacy filters - use for public league search
      queryParams.append('search_term', params.search_term);
    }
    if (params?.tournament_id) {
      queryParams.append('tournament_id', params.tournament_id);
    }
    if (params?.entry_fee) {
      queryParams.append('entry_fee', params.entry_fee);
    }
    if (params?.owner_id) {
      queryParams.append('owner_id', params.owner_id);
    }

    const url = `/api/leagues${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const data = await api.get<{ data: League[] }>(url);
    return data.data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

/**
 * Hook to fetch leagues with optional filters
 * - Without params: Returns all leagues
 * - With owner_id: Returns leagues for that owner
 * - With tournament_id: Returns leagues for that tournament
 * - With search_term: Filters public leagues by search term (respects privacy)
 * - With name: Searches all leagues by name pattern (bypasses privacy) - use for private league search
 */
export const useGetLeagues = (params?: FetchLeaguesParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: leagueQueryKeys.leagues(params),
    queryFn: () => fetchLeagues(params),
    enabled: enabled && !!firebaseAuth.currentUser,
  });
};
