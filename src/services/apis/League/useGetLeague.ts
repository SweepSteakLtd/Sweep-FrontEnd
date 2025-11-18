import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { LeagueDetailResponse } from './types';

export const useGetLeague = (leagueId: string) => {
  return useQuery({
    queryKey: ['league', leagueId],
    queryFn: async () => {
      const response = await api.get<{ data: LeagueDetailResponse }>(`/api/leagues/${leagueId}`);
      console.log('League API Response:', JSON.stringify(response, null, 2));
      return response.data;
    },
    enabled: !!leagueId,
  });
};
