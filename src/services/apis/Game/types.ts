import { z } from 'zod';
import { gameSchema } from '../schemas';

export type { Game, GamesResponse } from '../schemas';

// Extend the auto-generated Game schema to include join_code for private games
export const createGameResponseSchema = gameSchema.extend({
  join_code: z.string().optional(), // Only present for private games
});

export type CreateGameResponse = z.infer<typeof createGameResponseSchema>;

// These types are not in OpenAPI spec yet, defining them locally
export interface CreateGameRequest {
  name: string;
  description: string;
  entry_fee: number;
  max_participants: number;
  rewards: GameReward[];
  start_time: string;
  end_time: string;
  owner_id: string;
  tournament_id: string;
  type: 'public' | 'private';
}

export interface GameReward {
  rank: number;
  amount: number;
}
