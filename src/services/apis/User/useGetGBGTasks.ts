import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';

export interface GBGTask {
  taskId: string;
  variantId: string;
}

export type GBGJourneyStatus = 'InProgress' | 'Completed' | 'Failed';

export interface GetGBGTasksResponse {
  data: {
    instanceId: string;
    status: GBGJourneyStatus;
    tasks: GBGTask[];
    tasksCount: number;
    message: string;
  };
}

/**
 * Get pending GBG verification tasks for the current user
 *
 * Returns the list of tasks that need to be completed for the user's verification journey.
 * This is useful for checking what documents or information are needed before uploading.
 */
const getGBGTasks = async (): Promise<GetGBGTasksResponse> => {
  return api.get<GetGBGTasksResponse>('/api/users/tasks/gbg');
};

/**
 * Hook to get pending GBG verification tasks
 *
 * GET /api/users/tasks/gbg
 *
 * @param enabled - Whether to enable the query (default: true)
 */
export const useGetGBGTasks = (enabled = true) => {
  return useQuery({
    queryKey: ['gbg-tasks'],
    queryFn: getGBGTasks,
    enabled,
    // Don't cache this data for too long as task status can change
    staleTime: 10000, // 10 seconds
  });
};
