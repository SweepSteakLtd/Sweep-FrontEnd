import type { MockHandler } from '../types';
import {
  createGameHandler,
  getGameByIdHandler,
  getGamesHandler,
  joinGameHandler,
} from './gameHandler';
import { createProfileHandler } from './profileHandler';
import { getTournamentByIdHandler, getTournamentsHandler } from './tournamentHandler';
import { getUserHandler } from './userHandler';

/**
 * Registry of all mock handlers
 * Add new handlers here as you create them
 */
export const mockHandlers: MockHandler[] = [
  getUserHandler,
  createProfileHandler,
  getTournamentsHandler,
  getTournamentByIdHandler,
  getGamesHandler,
  getGameByIdHandler,
  createGameHandler,
  joinGameHandler,
];

/**
 * Get a handler by ID
 */
export const getHandlerById = (id: string): MockHandler | undefined => {
  return mockHandlers.find((h) => h.id === id);
};
