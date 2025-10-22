// Tournament list mock data
export const tournamentsListMock = {
  data: [
    {
      id: '1',
      name: 'The Masters',
      year: 2026,
      category: 'MASTERS',
      imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400',
      startDate: '2026-04-09T00:00:00Z',
      endDate: '2026-04-12T00:00:00Z',
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'The Open Championship',
      year: 2025,
      category: 'OPEN',
      imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400',
      startDate: '2025-07-17T00:00:00Z',
      endDate: '2025-07-20T00:00:00Z',
      status: 'upcoming',
    },
    {
      id: '3',
      name: 'The Players Championship',
      year: 2025,
      category: 'TC_SAWGRASS',
      imageUrl: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=400',
      startDate: '2025-03-13T00:00:00Z',
      endDate: '2025-03-16T00:00:00Z',
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'PGA Championship',
      year: 2025,
      category: 'PGA',
      imageUrl: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400',
      startDate: '2025-05-15T00:00:00Z',
      endDate: '2025-05-18T00:00:00Z',
      status: 'upcoming',
    },
  ],
};

// Single tournament detail mock
export const tournamentDetailMock = {
  data: {
    id: '1',
    name: 'The Masters',
    year: 2026,
    category: 'MASTERS',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400',
    startDate: '2026-04-09T00:00:00Z',
    endDate: '2026-04-12T00:00:00Z',
    status: 'upcoming',
    description: "The Masters Tournament, one of golf's four major championships.",
    venue: 'Augusta National Golf Club',
    location: 'Augusta, Georgia, USA',
  },
};

// Error mock
export const tournamentNotFoundMock = {
  error: 'Tournament not found',
};

export const tournamentServerErrorMock = {
  error: 'Failed to fetch tournaments',
};
