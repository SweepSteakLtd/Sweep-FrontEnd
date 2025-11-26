import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';

interface JoinLeagueRequest {
  league_id: string;
  join_code?: string;
}

interface JoinLeagueResponse {
  success: boolean;
  message?: string;
}

// API Function
export const joinLeague = async (data: JoinLeagueRequest): Promise<JoinLeagueResponse> => {
  const response = await api.post<{ data: JoinLeagueResponse }>(
    `/api/leagues/${data.league_id}/join`,
    { join_code: data.join_code },
  );
  return response.data;
};

/**
 * Hook to join a league (public or private with passcode)
 */
export const useJoinLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinLeague,
    onSuccess: () => {
      // Invalidate leagues query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
