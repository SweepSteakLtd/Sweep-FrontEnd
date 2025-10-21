import type { MockHandler } from '../types';
import { getUserHandler } from './userHandler';
import { createProfileHandler } from './profileHandler';

/**
 * Registry of all mock handlers
 * Add new handlers here as you create them
 */
export const mockHandlers: MockHandler[] = [getUserHandler, createProfileHandler];

/**
 * Get a handler by ID
 */
export const getHandlerById = (id: string): MockHandler | undefined => {
  return mockHandlers.find((h) => h.id === id);
};
