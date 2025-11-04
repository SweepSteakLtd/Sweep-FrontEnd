import { z } from 'zod';
import { leagueSchema, type League as LeagueSchema } from '../schemas';

// Re-export League from the auto-generated schemas
export type League = LeagueSchema;
export type LeaguesResponse = LeagueSchema[];
export type { LeaguesResponse as LeaguesResponseType, League as LeagueType } from '../schemas';

// Extend the auto-generated League schema to include join_code for private leagues
export const createLeagueResponseSchema = leagueSchema.extend({
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
