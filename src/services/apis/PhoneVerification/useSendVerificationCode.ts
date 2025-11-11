import { useMutation } from '@tanstack/react-query';
import { api } from '../apiClient';
import { SendVerificationResponse } from './types';

export interface SendVerificationCodeParams {
  phoneNumber: string;
}

// API Function - authenticated endpoint
const sendVerificationCode = async (
  params: SendVerificationCodeParams,
): Promise<SendVerificationResponse> => {
  const formattedPhone = params.phoneNumber.startsWith('+')
    ? params.phoneNumber
    : `+${params.phoneNumber}`;

  const data = await api.post<SendVerificationResponse>('/api/phone-verification/send', {
    phoneNumber: formattedPhone,
  });

  if (!data.success) {
    throw new Error(data.message || 'Failed to send verification code');
  }

  return data;
};

/**
 * Hook to send verification code to a phone number
 */
export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};
