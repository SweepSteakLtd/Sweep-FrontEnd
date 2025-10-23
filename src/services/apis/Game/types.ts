export type { Game, GamesResponse } from '../schemas';

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
  type?: string;
}

export interface GameReward {
  rank: number;
  amount: number;
}
