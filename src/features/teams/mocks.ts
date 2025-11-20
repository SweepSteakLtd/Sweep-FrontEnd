// Teams mock data
// Based on API schema: POST/PUT /api/teams/

export const teamsListMock = {
  data: [
    {
      id: 'team-001',
      name: 'Dream Team',
      owner_id: 'user-123',
      player_ids: ['profile-001', 'profile-002', 'profile-003'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'team-002',
      name: 'Masters Champions',
      owner_id: 'user-456',
      player_ids: ['profile-004', 'profile-005', 'profile-006'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'team-003',
      name: 'Eagle Squad',
      owner_id: 'user-789',
      player_ids: ['profile-007', 'profile-008', 'profile-009'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

// Single team detail mock
export const teamDetailMock = {
  data: {
    id: 'team-001',
    name: 'Dream Team',
    owner_id: 'user-123',
    player_ids: ['profile-001', 'profile-002', 'profile-003'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// Create team success mock
export const createTeamSuccessMock = {
  data: {
    id: 'team-new-001',
    name: 'My New Team',
    owner_id: 'current-user',
    player_ids: ['profile-001', 'profile-002', 'profile-003'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// Update team success mock
export const updateTeamSuccessMock = {
  data: {
    id: 'team-001',
    name: 'Updated Dream Team',
    owner_id: 'user-123',
    player_ids: ['profile-001', 'profile-002', 'profile-004'],
    created_at: new Date('2025-10-01T10:00:00Z').toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// Error mocks
export const teamNotFoundMock = {
  error: 'Team not found',
};

export const teamUnauthorizedMock = {
  error: 'You can only update teams you own',
};

export const teamInvalidDataMock = {
  error: 'Invalid team data',
};

export const teamServerErrorMock = {
  error: 'Failed to process request',
};
