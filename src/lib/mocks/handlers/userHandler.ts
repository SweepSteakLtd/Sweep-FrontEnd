import {
  userProfileCompleteMock,
  userProfileNoProfileMock,
  userProfileServerErrorMock,
} from '~/features/authentication/mocks';
import type { MockHandler } from '../types';

export const getUserHandler: MockHandler = {
  id: 'get-user',
  name: 'Get User Profile',
  group: 'User',
  method: 'GET',
  urlPattern: '/api/users/me',
  defaultScenario: 'Complete Profile',
  scenarios: {
    'Complete Profile': {
      status: 200,
      data: userProfileCompleteMock,
      delay: 500,
    },
    'No Profile (404)': {
      status: 404,
      data: userProfileNoProfileMock,
      delay: 500,
    },
    'Server Error (500)': {
      status: 500,
      data: userProfileServerErrorMock,
      delay: 1000,
    },
  },
};

export const deleteUserHandler: MockHandler = {
  id: 'delete-user',
  name: 'Delete User Account',
  group: 'User',
  method: 'DELETE',
  urlPattern: '/api/users/me',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 204,
      data: undefined,
      delay: 1000,
    },
    'Unauthorized (401)': {
      status: 401,
      data: { error: 'Unauthorized', message: 'Invalid email provided' },
      delay: 500,
    },
    'Server Error (500)': {
      status: 500,
      data: { error: 'Internal Server Error', message: 'Failed to delete account' },
      delay: 1000,
    },
  },
};
