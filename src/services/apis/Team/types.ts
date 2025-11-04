import type { League } from '../League/types';
import type { Player } from '../schemas';

export interface TeamData {
  id?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Team {
  league?: League;
  team?: TeamData;
  players?: Player[];
}
