/**
 * GBG Verification API Handlers
 *
 * Endpoints:
 * - GET /api/users/verify/gbg?instance_id={id} - Check GBG verification status
 * - POST /api/users/upload/gbg - Upload documents for manual verification
 */

import type { MockHandler } from '../types';

// GBG Verification Response Mocks
export const gbgVerificationPassMock = {
  status: 'PASS',
  message: 'Identity verification successful',
};

export const gbgVerificationInProgressMock = {
  status: 'IN_PROGRESS',
  message: 'Verification in progress',
};

export const gbgVerificationManualMock = {
  status: 'MANUAL',
  message: 'Manual verification required. Please upload supporting documents.',
};

export const gbgVerificationFailMock = {
  status: 'FAIL',
  message: 'Identity verification failed',
};

export const gbgVerificationServerErrorMock = {
  error: 'Internal Server Error',
  message: 'An unexpected error occurred',
};

// Document Upload Response Mocks
export const documentUploadSuccessMock = {
  data: {
    instanceId: 'mock-kyc-instance-456',
    taskId: 'mock-task-id-789',
    message: 'Documents uploaded successfully. Verification in progress.',
  },
};

export const documentUploadFailMock = {
  error: 'Failed to upload documents',
  message: 'Please try again or contact support.',
};

/**
 * GET /api/users/verify/gbg?instance_id={id}
 * Check GBG verification status
 *
 * Query params:
 * - instance_id: string (required) - The KYC instance ID from profile creation
 *
 * Response:
 * - status: 'PASS' | 'IN_PROGRESS' | 'MANUAL' | 'FAIL'
 * - message?: string
 */
export const verifyGBGHandler: MockHandler = {
  id: 'verify-gbg',
  name: 'GBG Verification Status',
  group: 'User',
  method: 'GET',
  urlPattern: '/api/users/verify/gbg',
  defaultScenario: 'Pass',
  scenarios: {
    Pass: {
      status: 200,
      data: gbgVerificationPassMock,
      delay: 1000,
    },
    'In Progress': {
      status: 200,
      data: gbgVerificationInProgressMock,
      delay: 500,
    },
    'Manual Review Required': {
      status: 200,
      data: gbgVerificationManualMock,
      delay: 1000,
    },
    Fail: {
      status: 200,
      data: gbgVerificationFailMock,
      delay: 1000,
    },
    'Server Error (500)': {
      status: 500,
      data: gbgVerificationServerErrorMock,
      delay: 500,
    },
  },
};

/**
 * POST /api/users/upload/gbg
 * Upload documents for manual GBG verification
 *
 * Request body: FormData with document files
 *
 * Response:
 * - success: boolean
 * - message: string
 */
export const uploadGBGDocumentsHandler: MockHandler = {
  id: 'upload-gbg-documents',
  name: 'Upload GBG Documents',
  group: 'User',
  method: 'POST',
  urlPattern: '/api/users/upload/gbg',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: documentUploadSuccessMock,
      delay: 2000,
    },
    'Upload Failed': {
      status: 400,
      data: documentUploadFailMock,
      delay: 1000,
    },
    'Server Error (500)': {
      status: 500,
      data: gbgVerificationServerErrorMock,
      delay: 500,
    },
  },
};
