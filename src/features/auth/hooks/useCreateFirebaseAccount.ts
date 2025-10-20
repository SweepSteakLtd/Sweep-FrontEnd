import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { getAuthErrorMessage } from './utils/authErrors';

export const useCreateFirebaseAccount = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const createAccount = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);

      const { title, message } = getAuthErrorMessage(error);
      showAlert({ title, message });
      return false;
    }
  };

  return {
    createAccount,
    loading,
  };
};
