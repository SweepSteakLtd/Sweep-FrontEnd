import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useAlert } from '~/components/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { getAuthErrorMessage } from './utils/authErrors';

export const useLogin = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      if (!user) {
        showAlert({
          title: 'Sign In Failed',
          message: 'Failed to sign in.',
        });
        setLoading(false);
        return false;
      }

      const currentToken = await user.getIdToken();

      if (!currentToken) {
        showAlert({
          title: 'Authentication Failed',
          message: 'Authentication failed. Please try again.',
        });
        setLoading(false);
        return false;
      }

      await AsyncStorage.setItem('access_token', JSON.stringify(currentToken));

      setLoading(false);
      return true;
    } catch (error: any) {
      const { title, message } = getAuthErrorMessage(error);
      showAlert({ title, message });
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    signIn,
  };
};
