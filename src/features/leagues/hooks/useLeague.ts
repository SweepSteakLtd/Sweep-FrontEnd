import { useMemo, useState } from 'react';
import { ApiError } from '~/services/apis/apiClient';
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
  totalTeams: number;
  entryFee: number;
  currentEntries: number;
  maxEntries: number;
  isLoading: boolean;
  error: Error | null;
  isOwner: boolean;
  joinCode?: string;
  /** Whether the league has ended (end_time has passed) */
  hasEnded: boolean;
  // Private league join code handling
  isPrivateLeagueError: boolean;
  inputJoinCode: string;
  setInputJoinCode: (code: string) => void;
  joinError: string;
  handleJoinWithCode: () => void;
  hasAttemptedJoin: boolean;
  submittedJoinCode?: string;
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

export const useLeague = (leagueId: string, initialJoinCode?: string): LeagueData => {
  const [inputJoinCode, setInputJoinCode] = useState('');
  const [submittedJoinCode, setSubmittedJoinCode] = useState(initialJoinCode);
  const [joinError, setJoinError] = useState('');

  const {
    data: leagueData,
    isLoading: leagueLoading,
    error: leagueError,
  } = useGetLeague(leagueId, submittedJoinCode);
  const { data: tournaments = [], isLoading: tournamentsLoading } = useGetTournaments();
  const { data: user } = useGetUser();

  const league = leagueData?.league || null;

  // Check if error is a 403 (private league access denied)
  const isPrivateLeagueError = leagueError instanceof ApiError && leagueError.status === 403;

  // Track if user has attempted to join with a code (for showing invalid code message)
  const hasAttemptedJoin = !!(submittedJoinCode && isPrivateLeagueError);

  const handleJoinWithCode = () => {
    if (!inputJoinCode.trim()) {
      setJoinError('Please enter a join code');
      return;
    }
    setJoinError('');
    setSubmittedJoinCode(inputJoinCode.trim());
  };

  const handleJoinCodeChange = (code: string) => {
    setInputJoinCode(code);
    setJoinError('');
  };

  const tournament = useMemo(
    () => tournaments.find((t) => t.id === league?.tournament_id),
    [tournaments, league?.tournament_id],
  );

  const carouselData = useMemo(() => mergeHolesAndAds(tournament), [tournament]);

  // Current user's entries = number of teams they have in this league
  const currentEntries = leagueData?.user_team_count ?? leagueData?.user_bets?.length ?? 0;
  const maxEntries = league?.max_participants || 100;
  // Total teams entered in the league
  const totalTeams = leagueData?.total_team_count ?? 0;
  // Entry fee in pounds (convert from pence)
  const entryFee = (league?.entry_fee ?? 0) / 100;
  // Use total_pot from API (in pence), convert to pounds for display
  // Fallback: calculate as (entry_fee x teams) x 0.9
  const totalPotPence =
    leagueData?.total_pot ?? Math.floor((league?.entry_fee ?? 0) * totalTeams * 0.9);
  const totalPot = totalPotPence / 100;

  // Check if current user is the owner of this league
  const isOwner = !!(user?.id && league?.owner_id && user.id === league.owner_id);

  // Check if the league has ended
  const hasEnded = useMemo(() => {
    if (!league?.end_time) return false;
    return new Date(league.end_time) <= new Date();
  }, [league?.end_time]);

  return {
    league,
    tournament,
    carouselData,
    totalPot,
    totalTeams,
    entryFee,
    currentEntries,
    maxEntries,
    isLoading: leagueLoading || tournamentsLoading,
    error: leagueError,
    isOwner,
    joinCode: league?.join_code,
    hasEnded,
    // Private league join code handling
    isPrivateLeagueError,
    inputJoinCode,
    setInputJoinCode: handleJoinCodeChange,
    joinError,
    handleJoinWithCode,
    hasAttemptedJoin,
    submittedJoinCode,
  };
};
