export interface LeaderboardPlayer {
  group: string;
  player_name: string;
  score: number;
  status: string; // F = Finished, MC = Missed Cut
}

export interface LeaderboardEntry {
  rank: number;
  user_id?: string; // Owner's user ID (optional - not yet returned by API)
  name: {
    main: string; // Team name
    substring: string; // Owner full name
    first_name?: string; // Owner's first name (optional - not yet returned by API)
    nickname?: string; // Owner's nickname (optional - not yet returned by API)
  };
  total: number;
  players: LeaderboardPlayer[];
  bestScore: number[]; // API uses camelCase
  prize: number;
}

export interface LeaderboardResponse {
  data: LeaderboardEntry[];
}
