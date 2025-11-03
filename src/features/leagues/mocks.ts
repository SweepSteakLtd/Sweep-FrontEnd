// Leagues list mock data
// Based on API schema: POST/GET /api/games/
export const leaguesListMock = {
  data: [
    {
      id: '1',
      name: 'Memnons GOLF',
      description: 'Join the biggest Masters sweepstake of the season!',
      tournament_id: '1',
      entry_fee: 785,
      join_code: '34634',
      max_participants: 100,
      current_participants: 43,
      contact_phone: '+44 7700 900000',
      contact_email: 'memnon@sweepsteak.com',
      contact_visibility: 'public',
      rewards: [
        { position: 1, amount: 200000, percentage: 60 },
        { position: 2, amount: 100000, percentage: 30 },
        { position: 3, amount: 35973, percentage: 10 },
      ],
      start_time: '2026-04-09T08:00:00Z',
      end_time: '2026-04-12T20:00:00Z',
      type: 'public',
      is_featured: true,
      owner_id: 'user-123',
      user_id_list: ['user-123', 'user-456', 'user-789'],
      created_at: '2025-10-01T10:00:00Z',
      updated_at: '2025-10-20T15:30:00Z',
    },
    {
      id: '2',
      name: 'Pauls PinLads',
      description: 'Private league for the pin seekers',
      tournament_id: '1',
      entry_fee: 567,
      join_code: '33634',
      max_participants: 80,
      current_participants: 51,
      contact_phone: '+44 7700 900001',
      contact_email: 'paul@sweepsteak.com',
      contact_visibility: 'participants',
      rewards: [
        { position: 1, amount: 171252, percentage: 60 },
        { position: 2, amount: 85626, percentage: 30 },
        { position: 3, amount: 28542, percentage: 10 },
      ],
      start_time: '2026-04-09T08:00:00Z',
      end_time: '2026-04-12T20:00:00Z',
      type: 'public',
      is_featured: false,
      owner_id: 'user-456',
      user_id_list: ['user-456'],
      created_at: '2025-10-02T12:00:00Z',
      updated_at: '2025-10-21T09:15:00Z',
    },
    {
      id: '3',
      name: 'BIG Johns League',
      description: 'Go big or go home!',
      tournament_id: '1',
      entry_fee: 1200,
      join_code: '34634',
      max_participants: 50,
      current_participants: 24,
      contact_phone: null,
      contact_email: 'bigjohn@sweepsteak.com',
      contact_visibility: 'private',
      rewards: [
        { position: 1, amount: 113700, percentage: 60 },
        { position: 2, amount: 56850, percentage: 30 },
        { position: 3, amount: 18950, percentage: 10 },
      ],
      start_time: '2026-04-09T08:00:00Z',
      end_time: '2026-04-12T20:00:00Z',
      type: 'private',
      is_featured: false,
      owner_id: 'user-789',
      user_id_list: ['user-789'],
      created_at: '2025-10-03T14:30:00Z',
      updated_at: '2025-10-20T11:00:00Z',
    },
    {
      id: '4',
      name: 'KING GOLF',
      description: 'For the kings of the course',
      tournament_id: '2',
      entry_fee: 450,
      join_code: '33634',
      max_participants: 40,
      current_participants: 22,
      contact_phone: '+44 7700 900003',
      contact_email: null,
      contact_visibility: 'public',
      rewards: [
        { position: 1, amount: 75534, percentage: 60 },
        { position: 2, amount: 37767, percentage: 30 },
        { position: 3, amount: 12589, percentage: 10 },
      ],
      start_time: '2026-06-12T08:00:00Z',
      end_time: '2026-06-15T20:00:00Z',
      type: 'public',
      is_featured: true,
      owner_id: 'user-321',
      user_id_list: ['user-321'],
      created_at: '2025-10-04T16:45:00Z',
      updated_at: '2025-10-19T13:20:00Z',
    },
  ],
};

// Single league detail mock
export const leagueDetailMock = {
  data: {
    id: '1',
    name: 'Memnons GOLF',
    description: 'Join the biggest Masters sweepstake of the season!',
    tournament_id: '1',
    entry_fee: 785,
    join_code: '34634',
    max_participants: 100,
    current_participants: 43,
    contact_phone: '+44 7700 900000',
    contact_email: 'memnon@sweepsteak.com',
    contact_visibility: 'public',
    rewards: [
      { position: 1, amount: 200000, percentage: 60 },
      { position: 2, amount: 100000, percentage: 30 },
      { position: 3, amount: 35973, percentage: 10 },
    ],
    start_time: '2026-04-09T08:00:00Z',
    end_time: '2026-04-12T20:00:00Z',
    type: 'public',
    is_featured: true,
    owner_id: 'user-123',
    user_id_list: ['user-123', 'user-456', 'user-789'],
    created_at: '2025-10-01T10:00:00Z',
    updated_at: '2025-10-20T15:30:00Z',
    rules: 'Standard golf sweepstake rules apply.',
  },
};

// Create league success mock
export const createLeagueSuccessMock = {
  data: {
    id: 'new-league-123',
    name: 'My Private League',
    description: 'Private league for friends',
    tournament_id: '1',
    entry_fee: 40,
    join_code: 'c7jxpt',
    max_participants: 3,
    current_participants: 0,
    contact_phone: '+44 7700 900999',
    contact_email: 'user@sweepsteak.com',
    contact_visibility: 'participants',
    rewards: [
      { position: 1, amount: 72, percentage: 60 },
      { position: 2, amount: 36, percentage: 30 },
      { position: 3, amount: 12, percentage: 10 },
    ],
    start_time: '2026-04-09T08:00:00Z',
    end_time: '2026-04-12T20:00:00Z',
    type: 'private',
    is_featured: false,
    owner_id: 'current-user',
    user_id_list: ['current-user'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    auto_join_link: 'https://sweepsteak.com/join/c7jxpt',
  },
};

// Join league success mock
export const joinLeagueSuccessMock = {
  data: {
    success: true,
    message: 'Successfully joined the league',
    leagueId: '1',
  },
};

// Error mocks
export const leagueNotFoundMock = {
  error: 'League not found',
};

export const leagueFullMock = {
  error: 'League is full',
};

export const invalidLeagueCodeMock = {
  error: 'Invalid league code',
};

export const alreadyJoinedMock = {
  error: 'You have already joined this league',
};

export const leagueServerErrorMock = {
  error: 'Failed to process request',
};
