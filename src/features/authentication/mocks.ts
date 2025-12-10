// User Profile Mocks
export const userProfileCompleteMock = {
  data: {
    id: 'mock-user-123',
    first_name: 'Mock',
    last_name: 'User',
    nickname: 'mockuser',
    email: 'mock@example.com',
    bio: '',
    profile_picture: '',
    phone_number: '+447777777777',
    game_stop_id: 'mock-game-stop-id',
    is_auth_verified: true,
    is_identity_verified: true,
    deposit_limit: {
      daily: null,
      weekly: null,
      monthly: null,
    },
    betting_limit: 0,
    payment_id: '',
    current_balance: 1000,
    is_admin: false,
    kyc_completed: true,
    kyc_instance_id: 'mock-kyc-instance-123',
    is_self_excluded: false,
    exclusion_ending: null,
    address: {
      town: 'London',
      line1: '123 Mock Street',
      line2: '',
      county: 'Greater London',
      country: 'GB',
      postcode: 'SW1A 1AA',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// User profile with verification pending (for testing verification flows)
export const userProfileUnverifiedMock = {
  data: {
    id: 'mock-user-unverified',
    first_name: 'Unverified',
    last_name: 'User',
    nickname: 'unverified',
    email: 'unverified@example.com',
    bio: '',
    profile_picture: '',
    phone_number: '+447777777777',
    game_stop_id: 'mock-game-stop-id',
    is_auth_verified: false,
    is_identity_verified: false,
    deposit_limit: {
      daily: null,
      weekly: null,
      monthly: null,
    },
    betting_limit: 0,
    payment_id: '',
    current_balance: 0,
    is_admin: false,
    kyc_completed: false,
    kyc_instance_id: 'mock-kyc-instance-456', // Same as profile creation for consistency
    is_self_excluded: false,
    exclusion_ending: null,
    address: {
      town: 'London',
      line1: '456 New Street',
      line2: '',
      county: 'Greater London',
      country: 'GB',
      postcode: 'E1 6AN',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export const userProfileNoProfileMock = {
  error: 'User profile not found',
};

export const userProfileServerErrorMock = {
  error: 'Internal server error',
};

// Profile Creation Mocks - returns kyc_instance_id for GBG verification
export const profileCreationSuccessMock = {
  data: {
    id: 'new-user-123',
    first_name: 'New',
    last_name: 'User',
    nickname: '',
    email: 'newuser@example.com',
    bio: '',
    profile_picture: '',
    phone_number: '+447777777777',
    game_stop_id: 'new-game-stop-id',
    is_auth_verified: false,
    is_identity_verified: false,
    deposit_limit: {
      daily: null,
      weekly: null,
      monthly: null,
    },
    betting_limit: 0,
    payment_id: '',
    current_balance: 0,
    is_admin: false,
    kyc_completed: false,
    kyc_instance_id: 'mock-kyc-instance-456', // This is used for GBG verification polling
    is_self_excluded: false,
    exclusion_ending: null,
    address: {
      town: 'London',
      line1: '456 New Street',
      line2: '',
      county: 'Greater London',
      country: 'GB',
      postcode: 'E1 6AN',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
