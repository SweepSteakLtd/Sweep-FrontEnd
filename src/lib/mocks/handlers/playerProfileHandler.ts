/**
 * Player Profile API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Endpoints:
 * - GET /api/player-profiles/ - Retrieves all player profiles
 * - GET /api/player-profiles/:id - Fetches specific player profile by ID
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import {
  playerProfileDetailMock,
  playerProfileNotFoundMock,
  playerProfileServerErrorMock,
  playerProfilesListMock,
} from '~/features/players/mocks';
import type { MockHandler } from '../types';

/**
 * GET /api/player-profiles/
 * Retrieves all player profiles
 * Supports query parameters:
 * - country: Filter player profiles by country (ISO code)
 */
export const getPlayerProfilesHandler: MockHandler = {
  id: 'get-player-profiles',
  name: 'Get Player Profiles List',
  group: 'Player',
  method: 'GET',
  urlPattern: '/api/player-profiles/',
  defaultScenario: 'Success',
  postProcessor: (url: string, data: unknown) => {
    // Parse URL to get query parameters
    const urlObj = new URL(url, 'http://localhost');
    const country = urlObj.searchParams.get('country');

    // Type guard for data structure
    if (!data || typeof data !== 'object' || !('data' in data) || !Array.isArray(data.data)) {
      return data;
    }

    // If no filters, return all data
    if (!country) {
      return data;
    }

    // Filter player profiles based on country
    const filteredProfiles = data.data.filter(
      (profile) =>
        profile &&
        typeof profile === 'object' &&
        'country' in profile &&
        typeof profile.country === 'string' &&
        profile.country.toLowerCase() === country.toLowerCase(),
    );

    return { data: filteredProfiles };
  },
  scenarios: {
    Success: {
      status: 200,
      data: playerProfilesListMock,
      delay: 500,
    },
    'Empty List': {
      status: 200,
      data: { data: [] },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: playerProfileServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * GET /api/player-profiles/:id
 * Fetches specific player profile by ID
 */
export const getPlayerProfileByIdHandler: MockHandler = {
  id: 'get-player-profile-by-id',
  name: 'Get Player Profile By ID',
  group: 'Player',
  method: 'GET',
  urlPattern: '/api/player-profiles/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: playerProfileDetailMock,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: playerProfileNotFoundMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: playerProfileServerErrorMock,
      delay: 1000,
    },
  },
};
