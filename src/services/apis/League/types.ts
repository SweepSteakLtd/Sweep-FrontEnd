import { z } from 'zod';
import { betSchema, leagueSchema, tournamentSchema, type League as LeagueSchema } from '../schemas';

// Re-export League from the auto-generated schemas
export type League = LeagueSchema;
export type LeaguesResponse = LeagueSchema[];
export type { LeaguesResponse as LeaguesResponseType, League as LeagueType } from '../schemas';

// Extend the auto-generated League schema to include join_code for private leagues
export const createLeagueResponseSchema = leagueSchema.extend({
  join_code: z.string().optional(), // Only present for private leagues
});

export type CreateLeagueResponse = z.infer<typeof createLeagueResponseSchema>;

// League detail response from GET /api/leagues/:id includes tournament and user_bets
export const leagueDetailResponseSchema = z.object({
  league: leagueSchema,
  tournament: tournamentSchema.optional(),
  user_bets: z.array(betSchema).optional().default([]),
});

export type LeagueDetailResponse = z.infer<typeof leagueDetailResponseSchema>;

// These types are not in OpenAPI spec yet, defining them locally
export interface CreateLeagueRequest {
  name: string;
  description?: string;
  entry_fee: number;
  max_participants: number;
  rewards: LeagueReward[];
  start_time: string;
  end_time: string;
  tournament_id: string;
  type: 'public' | 'private';
}

export interface LeagueReward {
  rank: number;
  amount: number;
}
