import { useMemo } from 'react';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import type { Tournament } from '~/services/apis/schemas';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';

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
  } | null;
  tournament: Tournament | undefined;
  carouselData: CarouselItem[];
  totalPot: number;
  currentParticipants: number;
  maxParticipants: number;
  isLoading: boolean;
  error: any;
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

export const useLeague = (leagueId: string): LeagueData => {
  const { data: leagueData, isLoading: leagueLoading, error: leagueError } = useGetLeague(leagueId);
  const { data: tournaments = [], isLoading: tournamentsLoading } = useGetTournaments();

  const league = leagueData?.league || null;

  const tournament = useMemo(
    () => tournaments.find((t) => t.id === league?.tournament_id),
    [tournaments, league?.tournament_id],
  );

  const carouselData = useMemo(() => mergeHolesAndAds(tournament), [tournament]);

  const totalPot = (league?.entry_fee ?? 0) * (league?.max_participants ?? 0);
  const currentParticipants = league?.user_id_list?.length || 0;
  const maxParticipants = league?.max_participants || 100;

  return {
    league,
    tournament,
    carouselData,
    totalPot,
    currentParticipants,
    maxParticipants,
    isLoading: leagueLoading || tournamentsLoading,
    error: leagueError,
  };
};
