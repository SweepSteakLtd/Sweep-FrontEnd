import type { League } from '../League/types';
import type { GroupPlayer } from '../schemas';

export interface TeamData {
  id?: string;
  owner_id?: string;
  league_id?: string;
  name?: string;
  position?: number | null;
  player_ids?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Team {
  league?: League;
  team?: TeamData;
  players?: GroupPlayer[];
}
