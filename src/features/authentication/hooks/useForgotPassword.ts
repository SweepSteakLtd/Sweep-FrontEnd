import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { getAuthErrorMessage } from './utils/authErrors';

export const useForgotPassword = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const resetPassword = async (email: string): Promise<boolean> => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(firebaseAuth, email);

      setLoading(false);

      showAlert({
        title: 'Password Reset Email Sent',
        message: 'Check your email for a link to reset your password.',
      });

      return true;
    } catch (error: unknown) {
      setLoading(false);
      const { title, message } = getAuthErrorMessage(error);
      showAlert({ title, message });
      return false;
    }
  };

  return {
    resetPassword,
    loading,
  };
};
