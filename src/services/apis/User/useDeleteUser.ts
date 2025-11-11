import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { useAuth } from '~/contexts/AuthContext';
import { firebaseAuth } from '~/lib/firebase';
import type { RootStackParamList } from '~/navigation/types';
import { api } from '../apiClient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Deletes the current user account
 */
const deleteUser = async (email: string): Promise<void> => {
  return api.delete(`/api/users/me?email=${encodeURIComponent(email)}`);
};

export const useDeleteUser = () => {
  const navigation = useNavigation<NavigationProp>();
  const { showAlert } = useAlert();
  const { signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteUser,
  });

  const handleDeleteAccount = () => {
    showAlert({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);

            try {
              const email = firebaseAuth.currentUser?.email;
              if (!email) {
                setIsDeleting(false);
                showAlert({
                  title: 'Error',
                  message: 'Unable to verify your account',
                });
                return;
              }

              await mutation.mutateAsync(email);

              // Clean up: sign out and clear Firebase auth
              await signOut();

              showAlert({
                title: 'Account Deleted',
                message: 'Your account has been successfully deleted',
                buttons: [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
              });
            } catch (error) {
              setIsDeleting(false);
              showAlert({
                title: 'Error',
                message: error instanceof Error ? error.message : 'Failed to delete account',
              });
            }
          },
        },
      ],
    });
  };

  return {
    isPending: isDeleting,
    handleDeleteAccount,
  };
};
