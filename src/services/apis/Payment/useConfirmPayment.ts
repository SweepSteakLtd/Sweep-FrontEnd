import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { ConfirmPaymentRequest, ConfirmPaymentResponse } from './types';

/**
 * Confirm a payment (complete with Paysafe using payment handle token)
 */
const confirmPayment = async (params: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> => {
  return api.post<ConfirmPaymentResponse, ConfirmPaymentRequest>('/api/payments/confirm', params);
};

/**
 * Hook to confirm a payment
 * Processes payment with Paysafe and updates user balance
 */
export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      // Invalidate user query to refresh balance
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // Invalidate transactions query to show new transaction
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
