import { useState } from 'react';

export const usePhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendVerificationCode = async (phone: string): Promise<boolean> => {
    setSending(true);
    setError(null);

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setPhoneNumber(phone);
    setCodeSent(true);
    setSending(false);

    return true;
  };

  const verifyCode = async (_code: string): Promise<boolean> => {
    if (!phoneNumber) {
      setError('Please request a verification code first');
      return false;
    }

    setVerifying(true);
    setError(null);

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setVerifying(false);

    // Accept any code for now (mock implementation)
    return true;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    sendVerificationCode,
    verifyCode,
    sending,
    verifying,
    codeSent,
    error,
    clearError,
    verificationId: phoneNumber,
  };
};
