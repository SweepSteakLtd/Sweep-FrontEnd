import { useQueryClient } from '@tanstack/react-query';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert } from 'react-native';
import { firebaseAuth } from '~/lib/firebase';
import { useCreateUser } from '~/services/apis/User/useCreateUser';
import { userQueryKeys } from '~/services/apis/User/useGetUser';
import { getAuthErrorMessage } from './utils/authErrors';

interface CreateAccountParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const createUserMutation = useCreateUser();
  const [loading, setLoading] = useState(false);

  const createAccount = async (params: CreateAccountParams) => {
    const { email, password, firstName, lastName, phoneNumber } = params;

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);

      if (!user) {
        Alert.alert('Failed to create account.');
        setLoading(false);
        return;
      }

      // Create user in database using React Query
      createUserMutation.mutate(
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber,
        },
        {
          onSuccess: async () => {
            if (!user.emailVerified) {
              Alert.alert('Please check your inbox for email verification!');
            }

            // Invalidate user queries to refetch with new account
            await queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
          },
          onError: (error: Error) => {
            console.error('[DEBUG]: Failed to create user in database', error);
            Alert.alert('Account Creation Error', 'Failed to create user profile. Please try again.');
          },
        }
      );
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[DEBUG]:', error);
      }

      const { title, message } = getAuthErrorMessage(error);
      Alert.alert(title, message);
    }
    setLoading(false);
  };

  return {
    loading: loading || createUserMutation.isPending,
    createAccount,
  };
};
