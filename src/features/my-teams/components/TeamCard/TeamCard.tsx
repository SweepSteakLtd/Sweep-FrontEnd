import React, { useMemo } from 'react';
import type { Team } from '~/services/apis/Team/types';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { PlayerAvatarStack } from '../PlayerAvatarStack';
import {
  Card,
  CardHeader,
  Footer,
  Header,
  LeagueName,
  PlayerCount,
  PlayersContainer,
  PlayersRow,
  PositionBadge,
  PositionText,
  TeamName,
  TournamentStatus,
} from './styles';

interface TeamCardProps {
  team: Team;
  onPress: () => void;
}

const getTournamentStatus = (
  startsAt?: string,
  finishesAt?: string,
  isLive?: boolean,
  isFinished?: boolean,
): string => {
  // Use backend flags if available
  if (isFinished) {
    return 'Tournament ended';
  }

  if (isLive) {
    if (finishesAt) {
      const now = new Date();
      const endDate = new Date(finishesAt);
      const diffTime = endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Tournament ends in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
    }
    return 'Tournament in progress';
  }

  // Fallback to date calculation if backend flags not available
  if (!startsAt) return 'Tournament dates unavailable';

  const now = new Date();
  const startDate = new Date(startsAt);

  if (now < startDate) {
    const diffTime = startDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Tournament starts in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  }

  return 'Tournament in progress';
};

export const TeamCard: React.FC<TeamCardProps> = ({ team, onPress }) => {
  const { data: tournaments, isLoading: isTournamentLoading } = useGetTournaments();

  const position = team.team?.position;
  const isTop3 = position !== undefined && position !== null && position <= 3;
  const playersCount = team.players?.length || 0;

  // Find tournament by ID from the league
  const tournament = useMemo(() => {
    const tournamentId = team.league?.tournament_id;
    if (!tournamentId || !tournaments) return undefined;
    return tournaments.find((t) => t.id === tournamentId);
  }, [team.league?.tournament_id, tournaments]);

  const tournamentStatus = useMemo(
    () =>
      getTournamentStatus(
        tournament?.starts_at,
        tournament?.finishes_at,
        tournament?.is_live,
        tournament?.is_finished,
      ),
    [tournament?.starts_at, tournament?.finishes_at, tournament?.is_live, tournament?.is_finished],
  );

  return (
    <Card activeOpacity={0.7} onPress={onPress}>
      <CardHeader>
        <Header>
          <TeamName>{team.team?.name || 'Unnamed Team'}</TeamName>
          <LeagueName>{team.league?.name || 'Unknown League'}</LeagueName>
        </Header>
        <PositionBadge isTop3={isTop3}>
          <PositionText isTop3={isTop3}>
            {position !== undefined && position !== null ? `#${position}` : '-'}
          </PositionText>
        </PositionBadge>
      </CardHeader>

      {team.players && team.players.length > 0 && (
        <PlayersContainer>
          <PlayersRow>
            <PlayerAvatarStack players={team.players} />
            <PlayerCount>
              {playersCount} {playersCount === 1 ? 'player' : 'players'}
            </PlayerCount>
          </PlayersRow>
        </PlayersContainer>
      )}

      {!isTournamentLoading && (
        <Footer>
          <TournamentStatus>{tournamentStatus}</TournamentStatus>
        </Footer>
      )}
    </Card>
  );
};
