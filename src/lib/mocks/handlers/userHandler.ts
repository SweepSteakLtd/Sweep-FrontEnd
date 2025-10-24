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
