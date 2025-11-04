import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { api } from '../apiClient';
import type { Team } from './types';

// Query Keys
export const teamQueryKeys = {
  teams: () => ['teams'] as const,
  team: (id: string) => ['teams', id] as const,
};

// API Function - exported for use outside of hook
export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const data = await api.get<{ data: Team[] }>('/api/teams');
    return data.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

/**
 * Hook to fetch all teams for the current user
 */
export const useGetTeams = (enabled: boolean = true) => {
  return useQuery({
    queryKey: teamQueryKeys.teams(),
    queryFn: () => fetchTeams(),
    enabled: enabled && !!firebaseAuth.currentUser,
  });
};
