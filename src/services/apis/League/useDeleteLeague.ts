import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';

// API Function
export const deleteLeague = async (leagueId: string): Promise<void> => {
  try {
    await api.delete(`/api/leagues/${leagueId}`);
  } catch (error) {
    console.error('Error deleting league:', error);
    throw error;
  }
};

/**
 * Hook to delete a league
 */
export const useDeleteLeague = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLeague,
    onSuccess: () => {
      // Invalidate leagues query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });
};
