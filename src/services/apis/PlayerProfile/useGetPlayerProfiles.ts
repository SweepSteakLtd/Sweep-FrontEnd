import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { PlayerGroup, PlayerProfilesResponse } from '../schemas';

export const useGetPlayerProfiles = (country?: string) => {
  return useQuery({
    queryKey: ['player-profiles', country],
    queryFn: async (): Promise<PlayerGroup[]> => {
      const params = country ? { country } : undefined;
      const response = await api.get<PlayerProfilesResponse>('/api/player-profiles/', { params });

      // The response should have a 'data' property that contains the array of groups
      if (response && typeof response === 'object' && 'data' in response) {
        return response.data || [];
      }

      // If response is already an array, return it directly
      if (Array.isArray(response)) {
        return response;
      }

      return [];
    },
  });
};
