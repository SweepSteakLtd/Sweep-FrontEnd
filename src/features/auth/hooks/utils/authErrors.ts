// Firebase Authentication error handling
// Firebase doesn't export error codes as constants, so we map them here
// Reference: https://firebase.google.com/docs/auth/admin/errors

interface AuthError {
  code?: string;
  message?: string;
}

interface ErrorResponse {
  title: string;
  message: string;
}

const AUTH_ERROR_MESSAGES: Record<string, ErrorResponse> = {
  'auth/invalid-credential': {
    title: 'Invalid Credentials',
    message: 'Invalid email or password. Please check your credentials.',
  },
  'auth/user-not-found': {
    title: 'Account Not Found',
    message: 'No account found with this email. Please sign up first.',
  },
  'auth/wrong-password': {
    title: 'Incorrect Password',
    message: 'Incorrect password. Please try again.',
  },
  'auth/invalid-email': {
    title: 'Invalid Email',
    message: 'Invalid email format. Please check your email.',
  },
  'auth/too-many-requests': {
    title: 'Too Many Attempts',
    message: 'Too many failed attempts. Please try again later.',
  },
  'auth/email-already-in-use': {
    title: 'Email Already Exists',
    message: 'An account with this email already exists. Please sign in instead.',
  },
  'auth/weak-password': {
    title: 'Weak Password',
    message: 'Password should be at least 6 characters long.',
  },
  'auth/network-request-failed': {
    title: 'Network Error',
    message: 'Network connection failed. Please check your internet connection.',
  },
};

const DEFAULT_ERROR: ErrorResponse = {
  title: 'Authentication Error',
  message: 'An error occurred. Please try again.',
};

export const getAuthErrorMessage = (error: AuthError): ErrorResponse => {
  if (!error?.code) {
    return DEFAULT_ERROR;
  }

  return AUTH_ERROR_MESSAGES[error.code] || DEFAULT_ERROR;
};
