// Firebase Password Change error handling
// Maps Firebase auth errors to user-friendly messages with field-specific errors

interface PasswordError {
  code?: string;
  message?: string;
}

export interface PasswordErrorResponse {
  title: string;
  message: string;
  fieldError?: {
    field: 'currentPassword' | 'newPassword' | 'confirmPassword';
    message: string;
  };
  // If true, show alert. If false, only show field error
  showAlert: boolean;
}

const PASSWORD_ERROR_MESSAGES: Record<string, PasswordErrorResponse> = {
  'auth/wrong-password': {
    title: 'Incorrect Password',
    message: 'Current password is incorrect.',
    fieldError: {
      field: 'currentPassword',
      message: 'Current password is incorrect',
    },
    showAlert: false, // Only show field error, not alert
  },
  'auth/weak-password': {
    title: 'Weak Password',
    message: 'New password is too weak.',
    fieldError: {
      field: 'newPassword',
      message: 'New password is too weak',
    },
    showAlert: false, // Only show field error, not alert
  },
  'auth/requires-recent-login': {
    title: 'Session Expired',
    message: 'Please sign out and sign back in before changing your password.',
    showAlert: true, // Show alert for session issues
  },
  'auth/network-request-failed': {
    title: 'Network Error',
    message: 'Network connection failed. Please check your internet connection.',
    showAlert: true,
  },
  'auth/too-many-requests': {
    title: 'Too Many Attempts',
    message: 'Too many failed attempts. Please try again later.',
    showAlert: true,
  },
};

const DEFAULT_ERROR: PasswordErrorResponse = {
  title: 'Update Failed',
  message: 'Failed to update password. Please try again.',
  showAlert: true,
};

export const getPasswordErrorMessage = (error: unknown): PasswordErrorResponse => {
  // Type guard to check if error is a PasswordError
  if (!error || typeof error !== 'object' || !('code' in error)) {
    return DEFAULT_ERROR;
  }

  const passwordError = error as PasswordError;
  if (!passwordError.code) {
    return DEFAULT_ERROR;
  }

  return PASSWORD_ERROR_MESSAGES[passwordError.code] || DEFAULT_ERROR;
};
