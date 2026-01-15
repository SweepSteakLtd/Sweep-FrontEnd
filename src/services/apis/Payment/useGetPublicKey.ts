import { useQuery } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { GetPublicKeyResponse } from './types';

/**
 * Fetch Paysafe public API key from backend
 */
const getPublicKey = async (): Promise<GetPublicKeyResponse> => {
  return api.get<GetPublicKeyResponse>('/api/payments/public-key');
};

/**
 * Hook to get Paysafe public API key
 * This fetches the key from the backend instead of using .env variables
 */
export const useGetPublicKey = (enabled = true) => {
  return useQuery({
    queryKey: ['paysafe-public-key'],
    queryFn: getPublicKey,
    enabled,
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });
};
