import type { MockHandler } from '../types';
import { adminHandlers } from './adminHandler';
import { createBetHandler, deleteBetHandler, getBetsHandler, updateBetHandler } from './betHandler';
import {
  createLeagueHandler,
  deleteLeagueHandler,
  getLeagueByIdHandler,
  getLeaguesHandler,
  updateLeagueHandler,
} from './leagueHandler';
import { createProfileHandler, updateProfileHandler } from './profileHandler';
import { getTournamentByIdHandler, getTournamentsHandler } from './tournamentHandler';
import { deleteUserHandler, getUserHandler } from './userHandler';

/**
 * Registry of all mock handlers
 * Add new handlers here as you create them
 */
export const mockHandlers: MockHandler[] = [
  // User endpoints
  getUserHandler,
  deleteUserHandler,
  createProfileHandler,
  updateProfileHandler,

  // Tournament endpoints
  getTournamentsHandler,
  getTournamentByIdHandler,

  // League endpoints (API still uses /games but we call them leagues in the app)
  getLeaguesHandler,
  getLeagueByIdHandler,
  createLeagueHandler,
  updateLeagueHandler,
  deleteLeagueHandler,

  // Bet endpoints
  createBetHandler,
  getBetsHandler,
  updateBetHandler,
  deleteBetHandler,

  // Admin endpoints
  ...adminHandlers,
];

/**
 * Get a handler by ID
 */
export const getHandlerById = (id: string): MockHandler | undefined => {
  return mockHandlers.find((h) => h.id === id);
};
