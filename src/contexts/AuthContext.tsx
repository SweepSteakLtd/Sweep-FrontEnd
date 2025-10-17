import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { getAuthErrorMessage } from '~/features/auth/hooks/utils/authErrors';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut }}>
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
