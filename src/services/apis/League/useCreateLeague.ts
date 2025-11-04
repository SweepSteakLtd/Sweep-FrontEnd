import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import { CreateLeagueRequest, CreateLeagueResponse } from './types';

// API Function
export const createLeague = async (
  leagueData: CreateLeagueRequest,
): Promise<CreateLeagueResponse> => {
  try {
    const data = await api.post<{ data: CreateLeagueResponse }>('/api/leagues', leagueData);
    return data.data;
  } catch (error) {
    console.error('Error creating league:', error);
    throw error;
  }
};

/**
 * Hook to create a new league
 */
export const useCreateLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLeague,
    onSuccess: () => {
      // Invalidate leagues query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });
};
