// User Profile Mocks
export const userProfileCompleteMock = {
  data: {
    id: 'mock-user-123',
    email: 'mock@example.com',
    username: 'mockuser',
    displayName: 'Mock User',
    handicap: 15,
    createdAt: new Date().toISOString(),
  },
};

export const userProfileNoProfileMock = {
  error: 'User profile not found',
};

export const userProfileServerErrorMock = {
  error: 'Internal server error',
};

// Profile Creation Mocks
export const profileCreationSuccessMock = {
  data: {
    id: 'new-user-123',
    email: 'newuser@example.com',
    username: 'newuser',
    displayName: 'New User',
    handicap: 0,
    createdAt: new Date().toISOString(),
  },
};

export const profileCreationUsernameTakenMock = {
  error: 'Username already taken',
  field: 'username',
};

export const profileCreationInvalidDataMock = {
  error: 'Invalid profile data',
  details: 'Username must be at least 3 characters',
};

export const profileCreationServerErrorMock = {
  error: 'Failed to create profile',
};
