import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { getAuthErrorMessage } from './utils/authErrors';

export type LoginResult =
  | { success: true; profileComplete: true }
  | { success: true; profileComplete: false }
  | { success: false; error: string };

export const useLogin = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  // Use the useGetUser hook but don't auto-fetch on mount
  const { refetch: refetchUser } = useGetUser(false);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    setLoading(true);

    try {
      // Step 1: Authenticate with Firebase
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      if (!user) {
        setLoading(false);
        const errorMsg = 'Failed to sign in.';
        showAlert({
          title: 'Sign In Failed',
          message: errorMsg,
        });
        return { success: false, error: errorMsg };
      }

      // Step 2: Check if user profile exists using useGetUser hook
      try {
        const { data: userData } = await refetchUser();

        setLoading(false);

        if (userData) {
          // Profile exists - full success
          return { success: true, profileComplete: true };
        } else {
          // No profile - needs profile setup
          return { success: true, profileComplete: false };
        }
      } catch (error) {
        console.error('[DEBUG]: Failed to check user profile:', error);
        setLoading(false);
        // Assume no profile on error
        return { success: true, profileComplete: false };
      }
    } catch (error: any) {
      setLoading(false);
      const { title, message } = getAuthErrorMessage(error);
      showAlert({ title, message });
      return { success: false, error: message };
    }
  };

  return {
    login,
    loading,
  };
};
