import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { Team } from '../schemas';

export interface UpdateTeamRequest {
  name?: string;
  players?: string[];
}

export const useUpdateTeam = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTeamRequest) => {
      const response = await api.put<Team>(`/api/teams/${teamId}`, data);
      return response;
    },
    onSuccess: () => {
      // Invalidate teams list and specific team to refetch
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['team', teamId] });
    },
  });
};
