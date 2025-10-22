/**
 * Game API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Endpoints:
 * - GET /api/games/ - Retrieves all games
 * - GET /api/games/:id - Fetches specific game by ID
 * - POST /api/games/ - Creates a new game
 * - PUT /api/games/:id - Updates game details
 * - DELETE /api/games/:id - Removes a game
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import {
  alreadyJoinedMock,
  createGameSuccessMock,
  gameDetailMock,
  gameFullMock,
  gameNotFoundMock,
  gameServerErrorMock,
  gamesListMock,
  invalidGameCodeMock,
  joinGameSuccessMock,
} from '~/features/games/mocks';
import type { MockHandler } from '../types';

/**
 * GET /api/games/
 * Retrieves all games
 */
export const getGamesHandler: MockHandler = {
  id: 'get-games',
  name: 'Get Games List',
  method: 'GET',
  urlPattern: '/api/games',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: gamesListMock,
      delay: 500,
    },
    'Empty List': {
      status: 200,
      data: { data: [] },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: gameServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * GET /api/games/:id
 * Fetches specific game by ID
 */
export const getGameByIdHandler: MockHandler = {
  id: 'get-game-by-id',
  name: 'Get Game By ID',
  method: 'GET',
  urlPattern: '/api/games/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: gameDetailMock,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: gameNotFoundMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: gameServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * POST /api/games/
 * Creates a new game
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
 * Response: 201 Created with game object including id, timestamps
 */
export const createGameHandler: MockHandler = {
  id: 'create-game',
  name: 'Create Game',
  method: 'POST',
  urlPattern: '/api/games',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 201,
      data: createGameSuccessMock,
      delay: 1000,
    },
    'Invalid Data': {
      status: 400,
      data: { error: 'Invalid game data' },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: gameServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * POST /api/games/join
 * Join a game using a join code
 *
 * Request body:
 * - join_code: string
 * - user_id: string
 *
 * Response: 200 OK with success message and game_id
 */
export const joinGameHandler: MockHandler = {
  id: 'join-game',
  name: 'Join Game',
  method: 'POST',
  urlPattern: '/api/games/join',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: joinGameSuccessMock,
      delay: 800,
    },
    'Invalid Code': {
      status: 400,
      data: invalidGameCodeMock,
      delay: 500,
    },
    'Game Full': {
      status: 400,
      data: gameFullMock,
      delay: 500,
    },
    'Already Joined': {
      status: 400,
      data: alreadyJoinedMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: gameServerErrorMock,
      delay: 1000,
    },
  },
};
