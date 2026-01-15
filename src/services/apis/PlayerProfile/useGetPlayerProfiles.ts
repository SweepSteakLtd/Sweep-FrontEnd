import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { PlayerProfile, PlayerProfilesResponse } from '../schemas';

interface GetPlayerProfilesParams {
  country?: string;
  tournament_id?: string;
}

export const useGetPlayerProfiles = (params?: GetPlayerProfilesParams) => {
  return useQuery({
    queryKey: ['player-profiles', params],
    queryFn: async (): Promise<PlayerProfile[]> => {
      const queryParams = params ? { ...params } : undefined;
      const response = await api.get<PlayerProfilesResponse>('/api/player-profiles/', {
        params: queryParams,
      });

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
