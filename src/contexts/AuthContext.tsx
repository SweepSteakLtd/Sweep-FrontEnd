import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { getAuthErrorMessage } from '~/features/auth/hooks/utils/authErrors';
import { useGetUser } from '~/services/apis/User/useGetUser';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  profileComplete: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { showAlert } = useAlert();

  // Use React Query to fetch user profile
  const { data: userData, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetUser();

  // Determine if profile is complete based on userData
  const profileComplete = isAuthenticated && !!userData;

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // If not authenticated, we're done with initial load
        setIsInitialLoad(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Once authenticated and profile fetch completes, mark initial load as done
  useEffect(() => {
    if (isAuthenticated && !isLoadingProfile && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isAuthenticated, isLoadingProfile, isInitialLoad]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      if (!user) {
        showAlert({
          title: 'Sign In Failed',
          message: 'Failed to sign in.',
        });
        return false;
      }

      return true;
    } catch (error: any) {
      const { title, message } = getAuthErrorMessage(error);
      showAlert({ title, message });
      return false;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const refreshProfile = async () => {
    await refetchProfile();
  };

  // Only show loading during initial load
  const isLoading = isInitialLoad;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        profileComplete,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
