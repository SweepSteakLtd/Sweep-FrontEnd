import { useMutation } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { InitiateWithdrawalRequest, InitiateWithdrawalResponse } from './types';

/**
 * Initiate a withdrawal (create pending withdrawal transaction)
 */
const initiateWithdrawal = async (
  params: InitiateWithdrawalRequest,
): Promise<InitiateWithdrawalResponse> => {
  return api.post<InitiateWithdrawalResponse, InitiateWithdrawalRequest>(
    '/api/payments/initiate-withdrawal',
    params,
  );
};

/**
 * Hook to initiate a withdrawal
 * Creates a pending withdrawal transaction and checks withdrawal limits
 */
export const useInitiateWithdrawal = () => {
  return useMutation({
    mutationFn: initiateWithdrawal,
  });
};
