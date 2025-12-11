// Sample holes data
const sampleHoles = [
  {
    id: 'hole-1',
    name: 'Hole 1',
    description: 'A challenging par 4 to start the round',
    position: 1,
    cover_image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400',
    par: 4,
    distance: 445,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'hole-2',
    name: 'Hole 2',
    description: 'Tricky par 5 with water hazard',
    position: 2,
    cover_image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400',
    par: 5,
    distance: 575,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'hole-3',
    name: 'Hole 3',
    description: 'Short but precise par 3',
    position: 3,
    cover_image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=400',
    par: 3,
    distance: 170,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Sample ads data
const sampleAds = [
  {
    id: 'ad-1',
    name: 'Premium Golf Equipment',
    description: 'Get 20% off on all golf clubs this week!',
    position: 1,
    website: 'https://example.com/golf-shop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ad-2',
    name: 'Golf Resort & Spa',
    description: 'Book your next golf vacation with us',
    position: 2,
    website: 'https://example.com/golf-resort',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Sample players data - attempts is an array of objects per schema
const samplePlayers = [
  {
    id: 'player-1',
    external_id: 'ext-001',
    level: 1,
    current_score: -5,
    position: 1,
    attempts: [
      { day: 'Day 1', hole_id: 'hole-1', hole_name: 'Hole 1', par: 4, attempt: 4 },
      { day: 'Day 1', hole_id: 'hole-2', hole_name: 'Hole 2', par: 5, attempt: 5 },
    ],
    missed_cut: false,
    odds: 12.5,
    profile_id: 'profile-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'player-2',
    external_id: 'ext-002',
    level: 2,
    current_score: -3,
    position: 2,
    attempts: [
      { day: 'Day 1', hole_id: 'hole-1', hole_name: 'Hole 1', par: 4, attempt: 3 },
      { day: 'Day 1', hole_id: 'hole-2', hole_name: 'Hole 2', par: 5, attempt: 4 },
    ],
    missed_cut: false,
    odds: 15.0,
    profile_id: 'profile-002',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'player-3',
    external_id: 'ext-003',
    level: 1,
    current_score: -2,
    position: 3,
    attempts: [
      { day: 'Day 1', hole_id: 'hole-1', hole_name: 'Hole 1', par: 4, attempt: 4 },
      { day: 'Day 1', hole_id: 'hole-2', hole_name: 'Hole 2', par: 5, attempt: 6 },
    ],
    missed_cut: false,
    odds: 18.0,
    profile_id: 'profile-003',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper to generate dates relative to now
const now = new Date();
const getRelativeDate = (daysOffset: number, hoursOffset: number = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(date.getHours() + hoursOffset);
  return date.toISOString();
};

// Tournament list mock data
export const tournamentsListMock = {
  data: [
    {
      id: 'tournament-1',
      name: 'The Masters',
      // Started 2 days ago, ends in 2 days (LIVE tournament)
      starts_at: getRelativeDate(-2),
      finishes_at: getRelativeDate(2),
      description: "The Masters Tournament, one of golf's four major championships.",
      url: 'https://example.com/masters',
      cover_picture: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400',
      gallery: [],
      holes: sampleHoles,
      ads: sampleAds,
      proposed_entry_fee: 100,
      maximum_cut_amount: 50,
      maximum_score_generator: 100,
      players: samplePlayers,
      rules: [
        'Each player must select their team before the tournament starts',
        'Points are awarded based on player performance in each round',
        'The player with the highest total score at the end wins',
        'In case of a tie, the player who entered first wins',
      ],
      instructions: [
        'Select your team of golfers from the available players',
        'Monitor live scores and leaderboards during the tournament',
        'Track your position on the league leaderboard',
        'Prizes are awarded to top finishers at tournament completion',
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'tournament-2',
      name: 'The Open Championship',
      // Starts in 7 days, ends in 10 days (UPCOMING tournament)
      starts_at: getRelativeDate(7),
      finishes_at: getRelativeDate(10),
      description: "The Open Championship, the oldest of golf's major championships.",
      url: 'https://example.com/open',
      cover_picture: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400',
      gallery: [],
      holes: sampleHoles,
      ads: sampleAds,
      proposed_entry_fee: 75,
      maximum_cut_amount: 40,
      maximum_score_generator: 90,
      players: samplePlayers,
      rules: [
        'Each player must select their team before the tournament starts',
        'Points are awarded based on player performance in each round',
        'The player with the highest total score at the end wins',
        'In case of a tie, the player who entered first wins',
      ],
      instructions: [
        'Select your team of golfers from the available players',
        'Monitor live scores and leaderboards during the tournament',
        'Track your position on the league leaderboard',
        'Prizes are awarded to top finishers at tournament completion',
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'tournament-3',
      name: 'The Players Championship',
      // Ended 5 days ago (FINISHED tournament)
      starts_at: getRelativeDate(-9),
      finishes_at: getRelativeDate(-5),
      description: 'The Players Championship at TPC Sawgrass.',
      url: 'https://example.com/players',
      cover_picture: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=400',
      gallery: [],
      holes: sampleHoles,
      ads: sampleAds,
      proposed_entry_fee: 50,
      maximum_cut_amount: 30,
      maximum_score_generator: 80,
      players: samplePlayers,
      rules: [
        'Each player must select their team before the tournament starts',
        'Points are awarded based on player performance in each round',
        'The player with the highest total score at the end wins',
        'In case of a tie, the player who entered first wins',
      ],
      instructions: [
        'Select your team of golfers from the available players',
        'Monitor live scores and leaderboards during the tournament',
        'Track your position on the league leaderboard',
        'Prizes are awarded to top finishers at tournament completion',
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'tournament-4',
      name: 'PGA Championship',
      // Starts in 30 days, ends in 33 days (UPCOMING tournament)
      starts_at: getRelativeDate(30),
      finishes_at: getRelativeDate(33),
      description: "The PGA Championship, one of golf's four major championships.",
      url: 'https://example.com/pga',
      cover_picture: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400',
      gallery: [],
      holes: sampleHoles,
      ads: sampleAds,
      proposed_entry_fee: 125,
      maximum_cut_amount: 60,
      maximum_score_generator: 110,
      players: samplePlayers,
      rules: [
        'Each player must select their team before the tournament starts',
        'Points are awarded based on player performance in each round',
        'The player with the highest total score at the end wins',
        'In case of a tie, the player who entered first wins',
      ],
      instructions: [
        'Select your team of golfers from the available players',
        'Monitor live scores and leaderboards during the tournament',
        'Track your position on the league leaderboard',
        'Prizes are awarded to top finishers at tournament completion',
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

// Single tournament detail mock - LIVE tournament (started 2 days ago, ends in 2 days)
export const tournamentDetailMock = {
  data: {
    id: 'tournament-1',
    name: 'The Masters',
    starts_at: getRelativeDate(-2),
    finishes_at: getRelativeDate(2),
    description: "The Masters Tournament, one of golf's four major championships.",
    url: 'https://example.com/masters',
    cover_picture: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400',
    gallery: [],
    holes: sampleHoles,
    ads: sampleAds,
    proposed_entry_fee: 100,
    maximum_cut_amount: 50,
    maximum_score_generator: 100,
    players: samplePlayers,
    rules: [
      'Each player must select their team before the tournament starts',
      'Points are awarded based on player performance in each round',
      'The player with the highest total score at the end wins',
      'In case of a tie, the player who entered first wins',
    ],
    instructions: [
      'Select your team of golfers from the available players',
      'Monitor live scores and leaderboards during the tournament',
      'Track your position on the league leaderboard',
      'Prizes are awarded to top finishers at tournament completion',
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// Error mock
export const tournamentNotFoundMock = {
  error: 'Tournament not found',
};

export const tournamentServerErrorMock = {
  error: 'Failed to fetch tournaments',
};
