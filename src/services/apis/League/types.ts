import { z } from 'zod';
import { betSchema, leagueSchema, type League as LeagueSchema } from '../schemas';

// Re-export League from the auto-generated schemas
export type League = LeagueSchema;
export type LeaguesResponse = LeagueSchema[];
export type { LeaguesResponse as LeaguesResponseType, League as LeagueType } from '../schemas';

// Extend the auto-generated League schema to include join_code for private leagues
export const createLeagueResponseSchema = leagueSchema.extend({
  join_code: z.string().optional(), // Only present for private leagues
});

export type CreateLeagueResponse = z.infer<typeof createLeagueResponseSchema>;

// Extended league schema with join_code for detail response
export const leagueDetailSchema = leagueSchema.extend({
  join_code: z.string().optional(), // Only returned for private leagues when user is owner or has access
});

// League detail response from GET /api/leagues/:id
// Note: user_team_count, total_team_count, total_pot are at root level, not inside league
export const leagueDetailResponseSchema = z.object({
  league: leagueDetailSchema,
  tournament: z.object({}).passthrough().optional(), // Tournament data
  user_bets: z.array(betSchema).optional().default([]),
  user_team_count: z.number().optional(), // Number of teams the current user has in this league
  total_team_count: z.number().optional(), // Total number of teams in the league
  total_pot: z.number().optional(), // Total prize pool (in pence)
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
