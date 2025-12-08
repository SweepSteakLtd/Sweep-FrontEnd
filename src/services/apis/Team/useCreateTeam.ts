import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { Team } from '../schemas';

export interface CreateTeamRequest {
  name?: string;
  league_id?: string;
  players?: string[];
  join_code?: string;
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTeamRequest) => {
      const response = await api.post<Team>('/api/teams/', data);
      return response;
    },
    onSuccess: () => {
      // Invalidate teams list to refetch
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};
