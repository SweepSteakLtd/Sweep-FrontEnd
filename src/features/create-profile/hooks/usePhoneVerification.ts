import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState } from 'react';

export const usePhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(
    null,
  );
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendVerificationCode = async (phone: string): Promise<boolean> => {
    setSending(true);
    setError(null);

    // Clean the phone number to ensure E.164 format (only digits after +)
    const cleanedPhone = phone.startsWith('+')
      ? `+${phone.substring(1).replace(/\D/g, '')}`
      : phone.replace(/\D/g, '');

    console.log('Original phone:', phone);
    console.log('Cleaned phone:', cleanedPhone);
    setPhoneNumber(cleanedPhone);

    try {
      // Use React Native Firebase for phone verification
      const confirmation = await auth().signInWithPhoneNumber(cleanedPhone);
      setConfirmation(confirmation);
      setVerificationId(confirmation.verificationId);
      setCodeSent(true);
      setSending(false);
      return true;
    } catch (err) {
      console.error('Firebase phone verification failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send verification code';
      setError(errorMessage);
      setSending(false);
      return false;
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    if (!confirmation) {
      setError('No confirmation object available');
      return false;
    }

    setVerifying(true);
    setError(null);

    try {
      // Verify code with Firebase
      await confirmation.confirm(code);
      setVerifying(false);
      return true;
    } catch (err) {
      console.error('Firebase code verification failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid verification code';
      setError(errorMessage);
      setVerifying(false);
      return false;
    }
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
    verificationId: verificationId || phoneNumber,
  };
};
