/**
 * Leaderboard API Handlers
 *
 * Endpoints:
 * - GET /api/leaderboards/:leagueId - Retrieves leaderboard for a league
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import type { LeaderboardEntry, LeaderboardResponse } from '~/services/apis/Leaderboard/types';
import type { MockHandler } from '../types';

// Mock players for each group (A-E)
const playersByGroup: Record<string, string[]> = {
  A: ['MacIntyre, R.', 'McIlroy, R.', 'Scheffler, S.', 'Rahm, J.'],
  B: ['Fitzpatric, M.', 'Aberg, L.', 'Hovland, V.', 'Morikawa, C.'],
  C: ['Straka, S.', 'Rose, J.', 'Fleetwood, T.', 'Lowry, S.'],
  D: ['Hojgaard, N.', 'Rai, A.', 'Hall, H.', 'Cantlay, P.'],
  E: ['Penge, M.', 'Hojgaard, R.', 'Bhatia, A.', 'Burns, S.'],
};

const teamNames = [
  'Guesswhosback',
  'McStrakBerg',
  'Kissed By A Rose',
  'Harry Hall',
  'TCs Top Picks',
  'Eagle Eyes',
  'Birdie Brigade',
  'Fairway Kings',
  'The Green Jackets',
  'Hole In One',
  'ASSL Golf',
  'Rose amongst thorns',
  'Par Excellence',
  'The Bogey Boys',
  'Chip Shot Champs',
];

const owners = [
  { fullName: 'Keith Masterson', firstName: 'Keith', nickname: 'KMaster' },
  { fullName: 'Marcus Hill', firstName: 'Marcus', nickname: 'MarcusG' },
  { fullName: 'Fred Rowe', firstName: 'Fred', nickname: '' },
  { fullName: 'Harry Hall', firstName: 'Harry', nickname: 'HH' },
  { fullName: 'TC Picks', firstName: 'TC', nickname: 'TCPicks' },
  { fullName: 'John Smith', firstName: 'John', nickname: '' },
  { fullName: 'Jane Doe', firstName: 'Jane', nickname: 'JaneD' },
  { fullName: 'Mike Wilson', firstName: 'Mike', nickname: '' },
  { fullName: 'Sarah Green', firstName: 'Sarah', nickname: 'SG' },
  { fullName: 'Tom Brown', firstName: 'Tom', nickname: '' },
  { fullName: 'Sam Stocks', firstName: 'Sam', nickname: 'Sammy' },
  { fullName: 'Ian Playford', firstName: 'Ian', nickname: 'IanP' },
  { fullName: 'Chris Taylor', firstName: 'Chris', nickname: '' },
  { fullName: 'Alex Johnson', firstName: 'Alex', nickname: 'AJ' },
  { fullName: 'Ryan Davis', firstName: 'Ryan', nickname: '' },
];

// User IDs for each owner - MOCK_CURRENT_USER_ID can be used to simulate current user's teams
export const MOCK_CURRENT_USER_ID = 'user-001';
const userIds = [
  MOCK_CURRENT_USER_ID, // Keith Masterson - current user for testing
  'user-002',
  'user-003',
  'user-004',
  'user-005',
  'user-006',
  'user-007',
  'user-008',
  MOCK_CURRENT_USER_ID, // Sam Stocks - another team for current user
  'user-010',
  'user-011',
  'user-012',
  'user-013',
  'user-014',
  'user-015',
];

const prizes = [216000, 54000, 45000, 27000, 18000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Generate base mock data
const generateBaseMockData = (): LeaderboardEntry[] => {
  return Array.from({ length: 15 }, (_, index) => {
    const players = Object.entries(playersByGroup).map(([group, names]) => {
      const playerIndex = (index + group.charCodeAt(0)) % names.length;
      const baseScore = Math.floor(Math.random() * 20) - 14; // -14 to +6
      return {
        group,
        player_name: names[playerIndex],
        score: baseScore,
        status: baseScore > 5 ? 'MC' : 'F',
      };
    });

    const validScores = players.filter((p) => p.status !== 'MC').map((p) => p.score);
    const sortedScores = [...validScores].sort((a, b) => a - b);
    const bestThree = sortedScores.slice(0, 3);
    const total = bestThree.reduce((sum, s) => sum + s, 0);

    const owner = owners[index % owners.length];
    return {
      rank: 0,
      user_id: userIds[index % userIds.length],
      name: {
        main: teamNames[index % teamNames.length],
        substring: owner.fullName,
        first_name: owner.firstName,
        nickname: owner.nickname || undefined,
      },
      total,
      players,
      bestScore: bestThree,
      prize: 0,
    };
  });
};

// Store base data for consistent variations
let baseData: LeaderboardEntry[] | null = null;

// Generate dynamic mock data with random score variations
const generateDynamicLeaderboardData = (): LeaderboardResponse => {
  if (!baseData) {
    baseData = generateBaseMockData();
  }

  // Create a copy with randomized score adjustments
  const updatedEntries = baseData.map((entry) => {
    const scoreAdjustment = Math.floor(Math.random() * 5) - 2;
    const newTotal = entry.total + scoreAdjustment;
    const newBestScore = entry.bestScore.map((score: number, idx: number) =>
      idx === 0 ? score + scoreAdjustment : score,
    );

    return {
      ...entry,
      total: newTotal,
      bestScore: newBestScore,
    };
  });

  // Sort by total (lower is better in golf)
  updatedEntries.sort((a, b) => a.total - b.total);

  // Assign ranks and prizes
  const rankedEntries = updatedEntries.map((entry, index) => ({
    ...entry,
    rank: index + 1,
    prize: prizes[index] || 0,
  }));

  return { data: rankedEntries };
};

const mockLeaderboardResponse = generateDynamicLeaderboardData();

/**
 * GET /api/leaderboards/:leagueId
 * Retrieves leaderboard for a specific league
 */
export const getLeaderboardHandler: MockHandler = {
  id: 'get-leaderboard',
  name: 'Get Leaderboard',
  group: 'Leaderboard',
  method: 'GET',
  urlPattern: '/api/leaderboards/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: mockLeaderboardResponse,
      delay: 300,
    },
    'Empty Leaderboard': {
      status: 200,
      data: { data: [] },
      delay: 300,
    },
    'Not Found': {
      status: 404,
      data: { error: 'League not found' },
      delay: 300,
    },
    'Server Error': {
      status: 500,
      data: { error: 'Internal server error' },
      delay: 1000,
    },
  },
  // Post processor to generate dynamic data on each request
  postProcessor: (_url: string, data: unknown) => {
    // Only modify successful responses
    if (data && typeof data === 'object' && 'data' in data) {
      return generateDynamicLeaderboardData();
    }
    return data;
  },
};
