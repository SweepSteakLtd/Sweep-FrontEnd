/**
 * League API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Endpoints:
 * - GET /api/games/ - Retrieves all leagues
 * - GET /api/games/:id - Fetches specific league by ID
 * - POST /api/games/ - Creates a new league
 * - PUT /api/games/:id - Updates league details
 * - DELETE /api/games/:id - Removes a league
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import {
  createLeagueSuccessMock,
  leagueDetailMock,
  leagueNotFoundMock,
  leagueServerErrorMock,
  leaguesListMock,
} from '~/features/leagues/mocks';
import type { MockHandler } from '../types';

/**
 * GET /api/games/
 * Retrieves all leagues
 */
export const getLeaguesHandler: MockHandler = {
  id: 'get-leagues',
  name: 'Get Leagues List',
  group: 'League',
  method: 'GET',
  urlPattern: '/api/games',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: leaguesListMock,
      delay: 500,
    },
    'Empty List': {
      status: 200,
      data: { data: [] },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: leagueServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * GET /api/games/:id
 * Fetches specific league by ID
 */
export const getLeagueByIdHandler: MockHandler = {
  id: 'get-league-by-id',
  name: 'Get League By ID',
  group: 'League',
  method: 'GET',
  urlPattern: '/api/games/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: leagueDetailMock,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: leagueNotFoundMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: leagueServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * POST /api/games/
 * Creates a new league
 *
 * Request body:
 * - name: string
 * - description?: string
 * - entry_fee: number
 * - contact_phone?: string
 * - contact_email?: string
 * - contact_visibility?: 'public' | 'participants' | 'private'
 * - join_code?: string (auto-generated if not provided)
 * - max_participants: number
 * - rewards: Array<{ position: number, amount: number, percentage: number }>
 * - start_time: string (ISO 8601)
 * - end_time: string (ISO 8601)
 * - owner_id: string
 * - tournament_id: string
 * - user_id_list?: string[]
 *
 * Response: 201 Created with league object including id, timestamps
 */
export const createLeagueHandler: MockHandler = {
  id: 'create-league',
  name: 'Create League',
  group: 'League',
  method: 'POST',
  urlPattern: '/api/games',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 201,
      data: createLeagueSuccessMock,
      delay: 1000,
    },
    'Invalid Data': {
      status: 400,
      data: { error: 'Invalid league data' },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: leagueServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * PUT /api/games/:id
 * Updates league details
 *
 * Request body:
 * - name?: string
 * - description?: string
 * - entry_fee?: number
 * - max_participants?: number
 * - is_featured?: boolean
 * - type?: string
 *
 * Response: 200 OK with updated league object
 */
export const updateLeagueHandler: MockHandler = {
  id: 'update-league',
  name: 'Update League',
  group: 'League',
  method: 'PUT',
  urlPattern: '/api/games/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: leagueDetailMock,
      delay: 800,
    },
    'Not Found': {
      status: 404,
      data: leagueNotFoundMock,
      delay: 500,
    },
    'Invalid Data': {
      status: 400,
      data: { error: 'Invalid league data' },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: leagueServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * DELETE /api/games/:id
 * Removes a league
 *
 * Response: 204 No Content
 */
export const deleteLeagueHandler: MockHandler = {
  id: 'delete-league',
  name: 'Delete League',
  group: 'League',
  method: 'DELETE',
  urlPattern: '/api/games/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 204,
      data: null,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: leagueNotFoundMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: leagueServerErrorMock,
      delay: 1000,
    },
  },
};
