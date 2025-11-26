import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { LeagueDetailResponse } from './types';

export const useGetLeague = (leagueId: string, joinCode?: string) => {
  return useQuery({
    queryKey: ['league', leagueId, joinCode],
    queryFn: async () => {
      const params = joinCode ? `?join_code=${encodeURIComponent(joinCode)}` : '';
      const response = await api.get<{ data: LeagueDetailResponse }>(
        `/api/leagues/${leagueId}${params}`,
      );
      return response.data;
    },
    enabled: !!leagueId,
  });
};
