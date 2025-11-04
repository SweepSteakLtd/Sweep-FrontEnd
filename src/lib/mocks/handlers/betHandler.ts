/**
 * Bet API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Endpoints:
 * - POST /api/bets/ - Places a new bet
 * - GET /api/bets/ - Retrieves bets (optionally filtered by league_id)
 * - PUT /api/bets/:id - Modifies existing bet
 * - DELETE /api/bets/:id - Cancels a bet
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import type { MockHandler } from '../types';

/**
 * POST /api/bets/
 * Places a new bet
 *
 * Request body:
 * - league_id: string (required)
 * - player_ids: string[] (required)
 * - amount: number (required)
 *
 * Response: 201 Created with bet object
 */
export const createBetHandler: MockHandler = {
  id: 'create-bet',
  name: 'Create Bet',
  group: 'Bet',
  method: 'POST',
  urlPattern: '/api/bets/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 201,
      data: {
        id: 'bet-123',
        league_id: 'league-456',
        owner_id: 'user-789',
        player_ids: ['player-1', 'player-2'],
        amount: 50,
        status: 'active',
        created_at: new Date().toISOString(),
      },
      delay: 800,
    },
    'Insufficient Funds': {
      status: 400,
      data: { error: 'Insufficient balance for bet' },
      delay: 500,
    },
    'Invalid Data': {
      status: 400,
      data: { error: 'Invalid bet data' },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: { error: 'Internal server error' },
      delay: 1000,
    },
  },
};

/**
 * GET /api/bets/
 * Retrieves bets
 *
 * Query Parameters:
 * - league_id?: string (optional filter)
 *
 * Response: 200 OK with array of bet objects
 */
export const getBetsHandler: MockHandler = {
  id: 'get-bets',
  name: 'Get Bets',
  group: 'Bet',
  method: 'GET',
  urlPattern: '/api/bets/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: {
        data: [
          {
            id: 'bet-123',
            league_id: 'league-456',
            owner_id: 'user-789',
            player_ids: ['player-1', 'player-2'],
            amount: 50,
            status: 'active',
            created_at: new Date().toISOString(),
          },
          {
            id: 'bet-124',
            league_id: 'league-456',
            owner_id: 'user-789',
            player_ids: ['player-3'],
            amount: 100,
            status: 'active',
            created_at: new Date().toISOString(),
          },
        ],
      },
      delay: 500,
    },
    'Empty List': {
      status: 200,
      data: { data: [] },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: { error: 'Internal server error' },
      delay: 1000,
    },
  },
};

/**
 * PUT /api/bets/:id
 * Modifies existing bet
 *
 * Request body:
 * - player_ids?: string[]
 * - amount?: number
 *
 * Response: 200 OK with updated bet object
 */
export const updateBetHandler: MockHandler = {
  id: 'update-bet',
  name: 'Update Bet',
  group: 'Bet',
  method: 'PUT',
  urlPattern: '/api/bets/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: {
        id: 'bet-123',
        league_id: 'league-456',
        owner_id: 'user-789',
        player_ids: ['player-1', 'player-3'],
        amount: 75,
        status: 'active',
        updated_at: new Date().toISOString(),
      },
      delay: 800,
    },
    'Not Found': {
      status: 404,
      data: { error: 'Bet not found' },
      delay: 500,
    },
    'Invalid Data': {
      status: 400,
      data: { error: 'Invalid bet data' },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: { error: 'Internal server error' },
      delay: 1000,
    },
  },
};

/**
 * DELETE /api/bets/:id
 * Cancels a bet
 *
 * Response: 204 No Content
 */
export const deleteBetHandler: MockHandler = {
  id: 'delete-bet',
  name: 'Delete Bet',
  group: 'Bet',
  method: 'DELETE',
  urlPattern: '/api/bets/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 204,
      data: null,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: { error: 'Bet not found' },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: { error: 'Internal server error' },
      delay: 1000,
    },
  },
};
