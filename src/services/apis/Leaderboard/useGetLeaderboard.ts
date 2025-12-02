import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { LeaderboardResponse } from './types';

export const leaderboardQueryKeys = {
  leaderboard: (leagueId: string) => ['leaderboard', leagueId] as const,
};

export const fetchLeaderboard = async (leagueId: string): Promise<LeaderboardResponse> => {
  const response = await api.get<LeaderboardResponse>(`/api/leaderboards/${leagueId}`);
  return response;
};

export const useGetLeaderboard = (leagueId: string, options?: { refetchInterval?: number }) => {
  return useQuery({
    queryKey: leaderboardQueryKeys.leaderboard(leagueId),
    queryFn: () => fetchLeaderboard(leagueId),
    enabled: !!leagueId,
    refetchInterval: options?.refetchInterval,
    // Always fetch fresh data when screen mounts to show newly created teams
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
