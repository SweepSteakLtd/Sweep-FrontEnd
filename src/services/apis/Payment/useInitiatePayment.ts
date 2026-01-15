import { useMutation } from '@tanstack/react-query';
import { api } from '../apiClient';
import type { InitiatePaymentRequest, InitiatePaymentResponse } from './types';

/**
 * Initiate a payment (create pending transaction)
 */
const initiatePayment = async (
  params: InitiatePaymentRequest,
): Promise<InitiatePaymentResponse> => {
  return api.post<InitiatePaymentResponse, InitiatePaymentRequest>(
    '/api/payments/initiate',
    params,
  );
};

/**
 * Hook to initiate a payment
 * Creates a pending transaction and checks deposit limits
 */
export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: initiatePayment,
  });
};
