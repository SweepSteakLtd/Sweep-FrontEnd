import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { api } from '../apiClient';
import { League } from './types';

// Query Keys
export const leagueQueryKeys = {
  leagues: () => ['leagues'] as const,
  league: (id: string) => ['leagues', id] as const,
};

// API Function - exported for use outside of hook
export const fetchLeagues = async (): Promise<League[]> => {
  try {
    const data = await api.get<{ data: League[] }>('/api/leagues');
    return data.data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

/**
 * Hook to fetch all leagues created by the current user across all tournaments
 */
export const useGetLeagues = (enabled: boolean = true) => {
  return useQuery({
    queryKey: leagueQueryKeys.leagues(),
    queryFn: () => fetchLeagues(),
    enabled: enabled && !!firebaseAuth.currentUser,
  });
};
