export type { Tournament, TournamentsResponse } from '../schemas';

// These types are not fully defined in OpenAPI spec yet, defining them locally
export interface TournamentHole {
  id: string;
  number: number;
  par: number;
  distance: number;
}

export interface TournamentAd {
  id: string;
  image_url: string;
  link_url: string;
}

export interface TournamentPlayer {
  id: string;
  user_id: string;
  tournament_id: string;
}
