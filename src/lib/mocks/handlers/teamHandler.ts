/**
 * Team API Handlers
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 *
 * Endpoints:
 * - GET /api/teams/ - Retrieves all teams
 * - GET /api/teams/:id - Fetches specific team by ID
 * - POST /api/teams/ - Creates a new team
 * - PUT /api/teams/:id - Updates team details
 * - DELETE /api/teams/:id - Removes a team
 *
 * All endpoints require "X-Auth-Id" header authentication.
 */

import {
  createTeamSuccessMock,
  teamDetailMock,
  teamInvalidDataMock,
  teamNotFoundMock,
  teamServerErrorMock,
  teamsListMock,
  teamUnauthorizedMock,
  updateTeamSuccessMock,
} from '~/features/teams/mocks';
import type { MockHandler } from '../types';

/**
 * GET /api/teams/
 * Retrieves all teams
 */
export const getTeamsHandler: MockHandler = {
  id: 'get-teams',
  name: 'Get Teams List',
  group: 'Team',
  method: 'GET',
  urlPattern: '/api/teams',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: teamsListMock,
      delay: 500,
    },
    'Empty List': {
      status: 200,
      data: { data: [] },
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: teamServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * GET /api/teams/:id
 * Fetches specific team by ID
 */
export const getTeamByIdHandler: MockHandler = {
  id: 'get-team-by-id',
  name: 'Get Team By ID',
  group: 'Team',
  method: 'GET',
  urlPattern: '/api/teams/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: teamDetailMock,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: teamNotFoundMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: teamServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * POST /api/teams/
 * Creates a new team
 *
 * Request body:
 * - name?: string (team name, 1-200 characters)
 * - league_id?: string (league ID for validation)
 * - players?: string[] (array of player IDs)
 *
 * Response: 201 Created with team object including id, timestamps
 */
export const createTeamHandler: MockHandler = {
  id: 'create-team',
  name: 'Create Team',
  group: 'Team',
  method: 'POST',
  urlPattern: '/api/teams',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 201,
      data: createTeamSuccessMock,
      delay: 1000,
    },
    'Invalid Data': {
      status: 400,
      data: teamInvalidDataMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: teamServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * PUT /api/teams/:id
 * Updates team details
 *
 * Request body:
 * - name?: string (team name, 1-200 characters)
 * - players?: string[] (array of player IDs - send all players, updated and not)
 *
 * Response: 200 OK with updated team object
 */
export const updateTeamHandler: MockHandler = {
  id: 'update-team',
  name: 'Update Team',
  group: 'Team',
  method: 'PUT',
  urlPattern: '/api/teams/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 200,
      data: updateTeamSuccessMock,
      delay: 800,
    },
    'Not Found': {
      status: 404,
      data: teamNotFoundMock,
      delay: 500,
    },
    Unauthorized: {
      status: 403,
      data: teamUnauthorizedMock,
      delay: 500,
    },
    'Invalid Data': {
      status: 400,
      data: teamInvalidDataMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: teamServerErrorMock,
      delay: 1000,
    },
  },
};

/**
 * DELETE /api/teams/:id
 * Removes a team
 *
 * Response: 204 No Content
 */
export const deleteTeamHandler: MockHandler = {
  id: 'delete-team',
  name: 'Delete Team',
  group: 'Team',
  method: 'DELETE',
  urlPattern: '/api/teams/',
  defaultScenario: 'Success',
  scenarios: {
    Success: {
      status: 204,
      data: null,
      delay: 500,
    },
    'Not Found': {
      status: 404,
      data: teamNotFoundMock,
      delay: 500,
    },
    Unauthorized: {
      status: 403,
      data: teamUnauthorizedMock,
      delay: 500,
    },
    'Server Error': {
      status: 500,
      data: teamServerErrorMock,
      delay: 1000,
    },
  },
};
