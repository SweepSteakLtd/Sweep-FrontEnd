import { useMemo } from 'react';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import type { Tournament } from '~/services/apis/schemas';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';

export type CarouselItem = {
  type: 'hole' | 'ad';
  data: {
    id?: string;
    name?: string;
    description?: string;
    position?: number;
    cover_image?: string;
    par?: number;
    distance?: number;
    website?: string;
    created_at?: string;
    updated_at?: string;
  };
};

export type LeagueData = {
  league: {
    id?: string;
    name?: string;
    description?: string;
    entry_fee?: number;
    max_participants?: number;
    user_id_list?: string[];
    start_time?: string;
    end_time?: string;
    tournament_id?: string;
    type?: string;
    owner_id?: string;
    join_code?: string;
  } | null;
  tournament: Tournament | undefined;
  carouselData: CarouselItem[];
  totalPot: number;
  currentEntries: number;
  maxEntries: number;
  isLoading: boolean;
  error: Error | null;
  isOwner: boolean;
  joinCode?: string;
};

const mergeHolesAndAds = (tournament: Tournament | undefined): CarouselItem[] => {
  if (!tournament) return [];

  const holes = tournament.holes || [];
  const ads = tournament.ads || [];
  const merged: CarouselItem[] = [];

  let holeIndex = 0;
  let adIndex = 0;

  while (holeIndex < holes.length || adIndex < ads.length) {
    // Add 2 holes
    if (holeIndex < holes.length) {
      merged.push({ type: 'hole', data: holes[holeIndex] });
      holeIndex++;
    }
    if (holeIndex < holes.length) {
      merged.push({ type: 'hole', data: holes[holeIndex] });
      holeIndex++;
    }

    // Add 1 ad
    if (adIndex < ads.length) {
      merged.push({ type: 'ad', data: ads[adIndex] });
      adIndex++;
    }
  }

  return merged;
};

export const useLeague = (leagueId: string, joinCode?: string): LeagueData => {
  const {
    data: leagueData,
    isLoading: leagueLoading,
    error: leagueError,
  } = useGetLeague(leagueId, joinCode);
  const { data: tournaments = [], isLoading: tournamentsLoading } = useGetTournaments();
  const { data: user } = useGetUser();

  const league = leagueData?.league || null;

  const tournament = useMemo(
    () => tournaments.find((t) => t.id === league?.tournament_id),
    [tournaments, league?.tournament_id],
  );

  const carouselData = useMemo(() => mergeHolesAndAds(tournament), [tournament]);

  const currentEntries = league?.user_id_list?.length || 0;
  const maxEntries = league?.max_participants || 100;
  // Total pot is 90% of entry fees collected (platform keeps 10%)
  const totalEntryFees = (league?.entry_fee ?? 0) * currentEntries;
  const totalPot = Math.floor(totalEntryFees * 0.9);

  // Check if current user is the owner of this league
  const isOwner = !!(user?.id && league?.owner_id && user.id === league.owner_id);

  return {
    league,
    tournament,
    carouselData,
    totalPot,
    currentEntries,
    maxEntries,
    isLoading: leagueLoading || tournamentsLoading,
    error: leagueError,
    isOwner,
    joinCode: league?.join_code,
  };
};
