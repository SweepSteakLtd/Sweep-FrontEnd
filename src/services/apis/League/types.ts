import { z } from 'zod';
import { gameSchema, type Game } from '../schemas';

// League is an alias for Game since the API uses /games endpoint
// but we call them "leagues" in the frontend for clarity
export type League = Game;
export type LeaguesResponse = Game[];
export type { Game, GamesResponse } from '../schemas';

// Extend the auto-generated Game schema to include join_code for private leagues
export const createLeagueResponseSchema = gameSchema.extend({
  join_code: z.string().optional(), // Only present for private leagues
});

export type CreateLeagueResponse = z.infer<typeof createLeagueResponseSchema>;

// These types are not in OpenAPI spec yet, defining them locally
export interface CreateLeagueRequest {
  name: string;
  description: string;
  entry_fee: number;
  max_participants: number;
  rewards: LeagueReward[];
  start_time: string;
  end_time: string;
  owner_id: string;
  tournament_id: string;
  type: 'public' | 'private';
}

export interface LeagueReward {
  rank: number;
  amount: number;
}
