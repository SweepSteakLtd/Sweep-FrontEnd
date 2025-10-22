/**
 * Tournament API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Note: The API currently has admin-only tournament endpoints:
 * - GET /api/admin/tournaments - Lists all tournaments (admin only)
 * - POST /api/admin/tournaments - Creates tournament (admin only)
 * - PUT /api/admin/tournaments/:id - Updates tournament (admin only)
 * - DELETE /api/admin/tournaments/:id - Deletes tournament (admin only)
 * - GET /api/admin/players/tournament/:tournamentId - Get tournament players
 *
 * These handlers assume user-facing endpoints will be available at:
 * - GET /api/tournaments - For listing tournaments
 * - GET /api/tournaments/:id - For getting tournament details
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import {
  tournamentDetailMock,
  tournamentNotFoundMock,
  tournamentServerErrorMock,
  tournamentsListMock,
} from '~/features/tournaments/mocks';
import type { MockHandler } from '../types';

/**
 * GET /api/tournaments
 * Retrieves all tournaments (user-facing endpoint)
 */
export const getTournamentsHandler: MockHandler = {
  id: 'get-tournaments',
  name: 'Get Tournaments List',
  method: 'GET',
  urlPattern: '/api/tournaments',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: tournamentsListMock,
      delay: 500,
    },
    'Empty List': {
      status: 200,
      data: { data: [] },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: tournamentServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * GET /api/tournaments/:id
 * Fetches specific tournament by ID (user-facing endpoint)
 */
export const getTournamentByIdHandler: MockHandler = {
  id: 'get-tournament-by-id',
  name: 'Get Tournament By ID',
  method: 'GET',
  urlPattern: '/api/tournaments/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: tournamentDetailMock,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: tournamentNotFoundMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: tournamentServerErrorMock,
      delay: 1000,
    },
  },
};
