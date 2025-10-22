// Games list mock data
// Based on API schema: POST/GET /api/games/
export const gamesListMock = {
  data: [
    {
      id: '1',
      name: 'Memnons GOLF',
      description: 'Join the biggest Masters sweepstake of the season!',
      tournamentId: '1',
      tournamentName: 'MASTERS',
      tournamentYear: 2026,
      entryFee: 785,
      joinCode: '34634',
      totalPot: 335973,
      maxParticipants: 100,
      currentParticipants: 43,
      contactPhone: '+44 7700 900000',
      contactEmail: 'memnon@sweepsteak.com',
      contactVisibility: 'public',
      rewards: [
        { position: 1, amount: 200000, percentage: 60 },
        { position: 2, amount: 100000, percentage: 30 },
        { position: 3, amount: 35973, percentage: 10 },
      ],
      startTime: '2026-04-09T08:00:00Z',
      endTime: '2026-04-12T20:00:00Z',
      isPrivate: false,
      isFeatured: true,
      ownerId: 'user-123',
      userIdList: ['user-123', 'user-456', 'user-789'],
      createdAt: '2025-10-01T10:00:00Z',
      updatedAt: '2025-10-20T15:30:00Z',
    },
    {
      id: '2',
      name: 'Pauls PinLads',
      description: 'Private league for the pin seekers',
      tournamentId: '1',
      tournamentName: 'MASTERS',
      tournamentYear: 2026,
      entryFee: 567,
      joinCode: '33634',
      totalPot: 285420,
      maxParticipants: 80,
      currentParticipants: 51,
      contactPhone: '+44 7700 900001',
      contactEmail: 'paul@sweepsteak.com',
      contactVisibility: 'participants',
      rewards: [
        { position: 1, amount: 171252, percentage: 60 },
        { position: 2, amount: 85626, percentage: 30 },
        { position: 3, amount: 28542, percentage: 10 },
      ],
      startTime: '2026-04-09T08:00:00Z',
      endTime: '2026-04-12T20:00:00Z',
      isPrivate: false,
      isFeatured: false,
      ownerId: 'user-456',
      userIdList: ['user-456'],
      createdAt: '2025-10-02T12:00:00Z',
      updatedAt: '2025-10-21T09:15:00Z',
    },
    {
      id: '3',
      name: 'BIG Johns League',
      description: 'Go big or go home!',
      tournamentId: '1',
      tournamentName: 'MASTERS',
      tournamentYear: 2026,
      entryFee: 785,
      joinCode: '34634',
      totalPot: 189500,
      maxParticipants: 50,
      currentParticipants: 24,
      contactPhone: null,
      contactEmail: 'bigjohn@sweepsteak.com',
      contactVisibility: 'private',
      rewards: [
        { position: 1, amount: 113700, percentage: 60 },
        { position: 2, amount: 56850, percentage: 30 },
        { position: 3, amount: 18950, percentage: 10 },
      ],
      startTime: '2026-04-09T08:00:00Z',
      endTime: '2026-04-12T20:00:00Z',
      isPrivate: false,
      isFeatured: false,
      ownerId: 'user-789',
      userIdList: ['user-789'],
      createdAt: '2025-10-03T14:30:00Z',
      updatedAt: '2025-10-20T11:00:00Z',
    },
    {
      id: '4',
      name: 'KING GOLF',
      description: 'For the kings of the course',
      tournamentId: '1',
      tournamentName: 'MASTERS',
      tournamentYear: 2026,
      entryFee: 567,
      joinCode: '33634',
      totalPot: 125890,
      maxParticipants: 40,
      currentParticipants: 22,
      contactPhone: '+44 7700 900003',
      contactEmail: null,
      contactVisibility: 'public',
      rewards: [
        { position: 1, amount: 75534, percentage: 60 },
        { position: 2, amount: 37767, percentage: 30 },
        { position: 3, amount: 12589, percentage: 10 },
      ],
      startTime: '2026-04-09T08:00:00Z',
      endTime: '2026-04-12T20:00:00Z',
      isPrivate: false,
      isFeatured: false,
      ownerId: 'user-321',
      userIdList: ['user-321'],
      createdAt: '2025-10-04T16:45:00Z',
      updatedAt: '2025-10-19T13:20:00Z',
    },
  ],
};

// Single game detail mock
export const gameDetailMock = {
  data: {
    id: '1',
    name: 'Memnons GOLF',
    description: 'Join the biggest Masters sweepstake of the season!',
    tournamentId: '1',
    tournamentName: 'MASTERS',
    tournamentYear: 2026,
    entryFee: 785,
    joinCode: '34634',
    totalPot: 335973,
    maxParticipants: 100,
    currentParticipants: 43,
    contactPhone: '+44 7700 900000',
    contactEmail: 'memnon@sweepsteak.com',
    contactVisibility: 'public',
    rewards: [
      { position: 1, amount: 200000, percentage: 60 },
      { position: 2, amount: 100000, percentage: 30 },
      { position: 3, amount: 35973, percentage: 10 },
    ],
    startTime: '2026-04-09T08:00:00Z',
    endTime: '2026-04-12T20:00:00Z',
    isPrivate: false,
    isFeatured: true,
    ownerId: 'user-123',
    userIdList: ['user-123', 'user-456', 'user-789'],
    createdAt: '2025-10-01T10:00:00Z',
    updatedAt: '2025-10-20T15:30:00Z',
    rules: 'Standard golf sweepstake rules apply.',
  },
};

// Create game success mock
export const createGameSuccessMock = {
  data: {
    id: 'new-game-123',
    name: 'My Private League',
    description: 'Private league for friends',
    tournamentId: '1',
    tournamentName: 'MASTERS',
    tournamentYear: 2026,
    entryFee: 40,
    joinCode: 'c7jxpt',
    totalPot: 0,
    maxParticipants: 3,
    currentParticipants: 0,
    contactPhone: '+44 7700 900999',
    contactEmail: 'user@sweepsteak.com',
    contactVisibility: 'participants',
    rewards: [
      { position: 1, amount: 72, percentage: 60 },
      { position: 2, amount: 36, percentage: 30 },
      { position: 3, amount: 12, percentage: 10 },
    ],
    startTime: '2026-04-09T08:00:00Z',
    endTime: '2026-04-12T20:00:00Z',
    isPrivate: true,
    isFeatured: false,
    ownerId: 'current-user',
    userIdList: ['current-user'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    autoJoinLink: 'https://sweepsteak.com/join/c7jxpt',
  },
};

// Join game success mock
export const joinGameSuccessMock = {
  data: {
    success: true,
    message: 'Successfully joined the game',
    gameId: '1',
  },
};

// Error mocks
export const gameNotFoundMock = {
  error: 'Game not found',
};

export const gameFullMock = {
  error: 'Game is full',
};

export const invalidGameCodeMock = {
  error: 'Invalid game code',
};

export const alreadyJoinedMock = {
  error: 'You have already joined this game',
};

export const gameServerErrorMock = {
  error: 'Failed to process request',
};
