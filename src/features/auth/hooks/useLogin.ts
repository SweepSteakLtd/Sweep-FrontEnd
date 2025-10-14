import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useAlert } from '~/components/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { userQueryKeys } from '~/services/apis/User/useGetUser';
import { getAuthErrorMessage } from './utils/authErrors';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      if (!user) {
        showAlert({
          title: 'Sign In Failed',
          message: 'Failed to sign in.',
        });
        setLoading(false);
        return;
      }

      const currentToken = await user.getIdToken();

      if (!currentToken) {
        showAlert({
          title: 'Authentication Failed',
          message: 'Authentication failed. Please try again.',
        });
        setLoading(false);
        return;
      }
      await AsyncStorage.setItem('access_token', JSON.stringify(currentToken));
      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[DEBUG]:', error);
      }

      const { title, message } = getAuthErrorMessage(error);
      showAlert({ title, message });
    }
    setLoading(false);
  };

  return {
    loading,
    signIn,
  };
};
