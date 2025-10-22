export interface Game {
  id: string;
  name: string;
  description?: string;
  tournamentId: string;
  tournamentName: string;
  tournamentYear: number;
  entryFee: number;
  joinCode: string;
  totalPot?: number;
  maxParticipants: number;
  currentParticipants?: number;
  contactPhone?: string | null;
  contactEmail?: string | null;
  contactVisibility?: string;
  rewards?: Array<{ position: number; amount: number; percentage: number }>;
  startTime?: string;
  endTime?: string;
  isPrivate: boolean;
  isFeatured: boolean;
  ownerId: string;
  userIdList?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GamesResponse {
  data: Game[];
}

export interface CreateGameRequest {
  name: string;
  description?: string;
  entry_fee: number;
  contact_phone?: string;
  contact_email?: string;
  contact_visibility?: 'public' | 'participants' | 'private';
  join_code?: string;
  max_participants: number;
  rewards: Array<{ position: number; amount: number; percentage: number }>;
  start_time: string;
  end_time: string;
  owner_id: string;
  tournament_id: string;
  user_id_list?: string[];
}
