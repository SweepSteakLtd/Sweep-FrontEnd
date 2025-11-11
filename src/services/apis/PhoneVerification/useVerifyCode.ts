import { useMutation } from '@tanstack/react-query';
import { api } from '../apiClient';
import { VerifyCodeResponse } from './types';

export interface VerifyCodeParams {
  verificationId: string;
  code: string;
}

// API Function - authenticated endpoint
const verifyCode = async (params: VerifyCodeParams): Promise<VerifyCodeResponse> => {
  const data = await api.get<VerifyCodeResponse>(
    `/api/phone-verification/${params.verificationId}?code=${params.code}`,
  );

  if (!data.success) {
    throw new Error(data.message || 'Invalid verification code');
  }

  return data;
};

/**
 * Hook to verify a code sent to a phone number
 */
export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
  });
};
