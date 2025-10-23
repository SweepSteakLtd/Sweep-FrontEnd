/**
 * Profile API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Endpoints:
 * - POST /api/users/ - Creates new user account
 * - PUT /api/users/me - Updates current user profile
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import {
  profileCreationInvalidDataMock,
  profileCreationServerErrorMock,
  profileCreationSuccessMock,
  profileCreationUsernameTakenMock,
} from '~/features/auth/mocks';
import type { MockHandler } from '../types';

/**
 * POST /api/users/
 * Creates new user account
 *
 * Request body:
 * - first_name: string (required)
 * - last_name: string (required)
 * - email: string (required)
 * - bio?: string
 * - profile_picture?: string
 * - phone_number?: string
 * - deposit_limit?: number
 * - betting_limit?: number
 *
 * Response: 201 Created with user object
 */
export const createProfileHandler: MockHandler = {
  id: 'create-profile',
  name: 'Create User Profile',
  group: 'User',
  method: 'POST',
  urlPattern: '/api/users/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 201,
      data: profileCreationSuccessMock,
      delay: 1000,
    },
    'Username Taken': {
      status: 400,
      data: profileCreationUsernameTakenMock,
      delay: 500,
    },
    'Invalid Data': {
      status: 400,
      data: profileCreationInvalidDataMock,
      delay: 500,
    },
    'Server Error (500)': {
      status: 500,
      data: profileCreationServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * PUT /api/users/me
 * Updates current user profile
 *
 * Request body:
 * - first_name?: string
 * - last_name?: string
 * - bio?: string
 * - profile_picture?: string
 * - phone_number?: string
 * - deposit_limit?: number
 * - betting_limit?: number
 *
 * Response: 200 OK with updated user object
 */
export const updateProfileHandler: MockHandler = {
  id: 'update-profile',
  name: 'Update User Profile',
  group: 'User',
  method: 'PUT',
  urlPattern: '/api/users/me',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: profileCreationSuccessMock,
      delay: 800,
    },
    'Invalid Data': {
      status: 400,
      data: profileCreationInvalidDataMock,
      delay: 500,
    },
    'Server Error (500)': {
      status: 500,
      data: profileCreationServerErrorMock,
      delay: 1000,
    },
  },
};
