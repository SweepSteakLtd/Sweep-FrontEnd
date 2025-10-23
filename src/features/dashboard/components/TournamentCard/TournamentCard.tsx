import type { Tournament } from '~/services/apis/schemas';
import { Card, TournamentImage, TournamentOverlay, TournamentTitle } from './styles';

interface TournamentCardProps {
  tournament: Tournament;
  onPress: () => void;
}

export const TournamentCard = ({ tournament, onPress }: TournamentCardProps) => {
  const year = new Date(tournament.starts_at).getFullYear();

  return (
    <Card onPress={onPress} activeOpacity={0.8}>
      <TournamentImage source={{ uri: tournament.cover_picture }} />
      <TournamentOverlay>
        <TournamentTitle>
          {tournament.name} {year}
        </TournamentTitle>
      </TournamentOverlay>
    </Card>
  );
};
