import {
  profileCreationInvalidDataMock,
  profileCreationServerErrorMock,
  profileCreationSuccessMock,
  profileCreationUsernameTakenMock,
} from '~/features/auth/mocks';
import type { MockHandler } from '../types';

export const createProfileHandler: MockHandler = {
  id: 'create-profile',
  name: 'Create User Profile',
  method: 'POST',
  urlPattern: '/api/users/me',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
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
