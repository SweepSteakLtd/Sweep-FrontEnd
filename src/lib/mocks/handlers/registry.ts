import type { MockHandler } from '../types';
import { createBetHandler, deleteBetHandler, getBetsHandler, updateBetHandler } from './betHandler';
import {
  createGameHandler,
  deleteGameHandler,
  getGameByIdHandler,
  getGamesHandler,
  updateGameHandler,
} from './gameHandler';
import { createProfileHandler, updateProfileHandler } from './profileHandler';
import { getTournamentByIdHandler, getTournamentsHandler } from './tournamentHandler';
import { getUserHandler } from './userHandler';

/**
 * Registry of all mock handlers
 * Add new handlers here as you create them
 */
export const mockHandlers: MockHandler[] = [
  // User endpoints
  getUserHandler,
  createProfileHandler,
  updateProfileHandler,

  // Tournament endpoints
  getTournamentsHandler,
  getTournamentByIdHandler,

  // Game endpoints
  getGamesHandler,
  getGameByIdHandler,
  createGameHandler,
  updateGameHandler,
  deleteGameHandler,

  // Bet endpoints
  createBetHandler,
  getBetsHandler,
  updateBetHandler,
  deleteBetHandler,
];

/**
 * Get a handler by ID
 */
export const getHandlerById = (id: string): MockHandler | undefined => {
  return mockHandlers.find((h) => h.id === id);
};
