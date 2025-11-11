import { useState } from 'react';
import { useSendVerificationCode } from '~/services/apis/PhoneVerification/useSendVerificationCode';
import { useVerifyCode } from '~/services/apis/PhoneVerification/useVerifyCode';

export const usePhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const sendMutation = useSendVerificationCode();
  const verifyMutation = useVerifyCode();

  const sendVerificationCode = async (phone: string): Promise<boolean> => {
    try {
      const result = await sendMutation.mutateAsync({ phoneNumber: phone });

      setVerificationId(result.verificationId || null);
      setPhoneNumber(phone);
      setCodeSent(true);

      return true;
    } catch (err) {
      console.error('Error sending verification code:', err);
      return false;
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    if (!verificationId) {
      return false;
    }

    try {
      await verifyMutation.mutateAsync({ verificationId, code });
      return true;
    } catch (err) {
      console.error('Error verifying code:', err);
      return false;
    }
  };

  const clearError = () => {
    sendMutation.reset();
    verifyMutation.reset();
  };

  return {
    sendVerificationCode,
    verifyCode,
    sending: sendMutation.isPending,
    verifying: verifyMutation.isPending,
    codeSent,
    error: sendMutation.error?.message || verifyMutation.error?.message || null,
    clearError,
    verificationId: verificationId || phoneNumber,
  };
};
