import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { Activitie, ActivityResponse } from './types';

export const activityQueryKeys = {
  all: ['activity'] as const,
  activity: (timestamp?: string) => ['activity', 'current', timestamp] as const,
};

// API Function
export const fetchActivity = async (timestamp?: string): Promise<Activitie> => {
  const url = timestamp ? `/api/activities/?timestamp=${timestamp}` : '/api/activities/';
  const response = await api.get<ActivityResponse>(url);
  return response.data;
};

/**
 * Hook to get current user activity via GET /api/activities/
 * @param timestamp - Optional timestamp filter parameter
 */
export const useGetActivity = (timestamp?: string) => {
  return useQuery({
    queryKey: activityQueryKeys.activity(timestamp),
    queryFn: () => fetchActivity(timestamp),
  });
};
