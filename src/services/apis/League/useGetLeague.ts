import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { LeagueDetailResponse } from './types';

export const useGetLeague = (leagueId: string) => {
  return useQuery({
    queryKey: ['league', leagueId],
    queryFn: async () => {
      const response = await api.get<{ data: LeagueDetailResponse }>(`/api/leagues/${leagueId}`);
      return response.data;
    },
    enabled: !!leagueId,
  });
};
