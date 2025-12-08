/**
 * Admin API Handlers
 *
 * Admin endpoints for managing leagues, player profiles, players, tournaments, transactions, and users.
 * These endpoints have elevated permissions compared to regular user endpoints.
 *
 * Based on Swagger API documentation from:
 * https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json
 */

import type { MockHandler } from '../types';

export const adminHandlers: MockHandler[] = [
  // Admin Leagues - GET
  {
    id: 'admin-get-leagues',
    name: 'Admin: Get All Leagues',
    group: 'League',
    method: 'GET',
    urlPattern: '/api/admin/leagues',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { data: [] },
        delay: 500,
      },
    },
  },

  // Admin Leagues - PUT
  {
    id: 'admin-update-league',
    name: 'Admin: Update League',
    group: 'League',
    method: 'PUT',
    urlPattern: '/api/admin/leagues/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { message: 'League updated successfully' },
        delay: 500,
      },
    },
  },

  // Admin Leagues - DELETE
  {
    id: 'admin-delete-league',
    name: 'Admin: Delete League',
    group: 'League',
    method: 'DELETE',
    urlPattern: '/api/admin/leagues/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 204,
        data: null,
        delay: 500,
      },
    },
  },

  // Admin Player Profiles - POST
  {
    id: 'admin-create-player-profile',
    name: 'Admin: Create Player Profile',
    group: 'User',
    method: 'POST',
    urlPattern: '/api/admin/player-profiles',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 201,
        data: {
          id: 'profile-new',
          external_id: 'ext-12345',
          first_name: 'John',
          last_name: 'Doe',
          country: 'USA',
          age: 25,
          ranking: 1500,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        delay: 500,
      },
    },
  },

  // Admin Player Profiles - GET
  {
    id: 'admin-get-player-profiles',
    name: 'Admin: Get Player Profiles',
    group: 'User',
    method: 'GET',
    urlPattern: '/api/admin/player-profiles',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: [],
        delay: 500,
      },
    },
  },

  // Admin Player Profiles - PUT
  {
    id: 'admin-update-player-profile',
    name: 'Admin: Update Player Profile',
    group: 'User',
    method: 'PUT',
    urlPattern: '/api/admin/player-profiles/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { message: 'Player profile updated successfully' },
        delay: 500,
      },
    },
  },

  // Admin Player Profiles - DELETE
  {
    id: 'admin-delete-player-profile',
    name: 'Admin: Delete Player Profile',
    group: 'User',
    method: 'DELETE',
    urlPattern: '/api/admin/player-profiles/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 204,
        data: null,
        delay: 500,
      },
    },
  },

  // Admin Players - POST
  {
    id: 'admin-create-player',
    name: 'Admin: Create Player',
    group: 'Tournament',
    method: 'POST',
    urlPattern: '/api/admin/players',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 201,
        data: {
          id: 'player-new',
          external_id: 'ext-player-1',
          level: 1,
          current_score: 0,
          position: 1,
          attempts: {},
          missed_cut: false,
          odds: 1.5,
          profile_id: 'profile-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        delay: 500,
      },
    },
  },

  // Admin Players by Tournament - GET
  {
    id: 'admin-get-tournament-players',
    name: 'Admin: Get Tournament Players',
    group: 'Tournament',
    method: 'GET',
    urlPattern: '/api/admin/players/tournament/:tournamentId',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: [],
        delay: 500,
      },
    },
  },

  // Admin Players - PUT
  {
    id: 'admin-update-player',
    name: 'Admin: Update Player',
    group: 'Tournament',
    method: 'PUT',
    urlPattern: '/api/admin/players/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { message: 'Player updated successfully' },
        delay: 500,
      },
    },
  },

  // Admin Players - DELETE
  {
    id: 'admin-delete-player',
    name: 'Admin: Delete Player',
    group: 'Tournament',
    method: 'DELETE',
    urlPattern: '/api/admin/players/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 204,
        data: null,
        delay: 500,
      },
    },
  },

  // Admin Tournaments - POST
  {
    id: 'admin-create-tournament',
    name: 'Admin: Create Tournament',
    group: 'Tournament',
    method: 'POST',
    urlPattern: '/api/admin/tournaments',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 201,
        data: {
          id: 'tournament-new',
          name: 'New Tournament',
          description: 'A new tournament',
          starts_at: new Date().toISOString(),
          finishes_at: new Date().toISOString(),
          url: 'https://example.com',
          cover_picture: 'https://example.com/cover.jpg',
          gallery: [],
          holes: [],
          ads: [],
          proposed_entry_fee: 100,
          maximum_cut_amount: 1000,
          maximum_score_generator: 10,
          players: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        delay: 500,
      },
    },
  },

  // Admin Tournaments - GET
  {
    id: 'admin-get-tournaments',
    name: 'Admin: Get Tournaments',
    group: 'Tournament',
    method: 'GET',
    urlPattern: '/api/admin/tournaments',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { data: [] },
        delay: 500,
      },
    },
  },

  // Admin Tournaments - PUT
  {
    id: 'admin-update-tournament',
    name: 'Admin: Update Tournament',
    group: 'Tournament',
    method: 'PUT',
    urlPattern: '/api/admin/tournaments/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { message: 'Tournament updated successfully' },
        delay: 500,
      },
    },
  },

  // Admin Tournaments - DELETE
  {
    id: 'admin-delete-tournament',
    name: 'Admin: Delete Tournament',
    group: 'Tournament',
    method: 'DELETE',
    urlPattern: '/api/admin/tournaments/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 204,
        data: null,
        delay: 500,
      },
    },
  },

  // Admin Transactions - POST
  {
    id: 'admin-create-transaction',
    name: 'Admin: Create Transaction',
    group: 'User',
    method: 'POST',
    urlPattern: '/api/admin/transactions',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 201,
        data: {
          id: 'transaction-new',
          name: 'New Transaction',
          value: '100',
          type: 'deposit',
          charge_id: 'charge-123',
          user_id: 'user-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        delay: 500,
      },
    },
  },

  // Admin Transactions - PUT
  {
    id: 'admin-update-transaction',
    name: 'Admin: Update Transaction',
    group: 'User',
    method: 'PUT',
    urlPattern: '/api/admin/transactions/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { message: 'Transaction updated successfully' },
        delay: 500,
      },
    },
  },

  // Admin Transactions - DELETE
  {
    id: 'admin-delete-transaction',
    name: 'Admin: Delete Transaction',
    group: 'User',
    method: 'DELETE',
    urlPattern: '/api/admin/transactions/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 204,
        data: null,
        delay: 500,
      },
    },
  },

  // Admin Users - GET
  {
    id: 'admin-get-users',
    name: 'Admin: Get All Users',
    group: 'User',
    method: 'GET',
    urlPattern: '/api/admin/users',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { data: [] },
        delay: 500,
      },
    },
  },

  // Admin Users - PUT
  {
    id: 'admin-update-user',
    name: 'Admin: Update User',
    group: 'User',
    method: 'PUT',
    urlPattern: '/api/admin/users/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 200,
        data: { message: 'User updated successfully' },
        delay: 500,
      },
    },
  },

  // Admin Users - DELETE
  {
    id: 'admin-delete-user',
    name: 'Admin: Delete User',
    group: 'User',
    method: 'DELETE',
    urlPattern: '/api/admin/users/:id',
    defaultScenario: 'Success',
    isAdmin: true,
    scenarios: {
      Success: {
        status: 204,
        data: null,
        delay: 500,
      },
    },
  },
];
