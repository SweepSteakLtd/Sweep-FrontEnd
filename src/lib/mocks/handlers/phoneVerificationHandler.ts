import type { MockHandler } from '../types';

export const sendVerificationCodeHandler: MockHandler = {
  id: 'send-verification-code',
  name: 'Send Verification Code',
  group: 'User',
  method: 'POST',
  urlPattern: '/api/phone-verification/send',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: {
        success: true,
        verificationId: 'mock-verification-123',
        message: 'Verification code sent successfully',
      },
      delay: 500,
    },
    'Rate Limited': {
      status: 429,
      data: {
        success: false,
        message: 'Too many requests. Please try again later.',
      },
      delay: 500,
    },
    'Invalid Phone': {
      status: 400,
      data: {
        success: false,
        message: 'Invalid phone number format',
      },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: {
        success: false,
        message: 'Failed to send verification code',
      },
      delay: 1000,
    },
  },
};

export const verifyCodeHandler: MockHandler = {
  id: 'verify-code',
  name: 'Verify Phone Code',
  group: 'User',
  method: 'GET',
  urlPattern: '/api/phone-verification/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: {
        success: true,
        message: 'Phone number verified successfully',
      },
      delay: 500,
    },
    'Invalid Code': {
      status: 400,
      data: {
        success: false,
        message: 'Invalid verification code',
      },
      delay: 500,
    },
    'Expired Code': {
      status: 400,
      data: {
        success: false,
        message: 'Verification code has expired',
      },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: {
        success: false,
        message: 'Failed to verify code',
      },
      delay: 1000,
    },
  },
};
