import { Card, TournamentImage, TournamentOverlay, TournamentTitle } from './styles';

export interface Tournament {
  id: string;
  name: string;
  year: number;
  imageUrl: string;
  category: string;
}

interface TournamentCardProps {
  tournament: Tournament;
  onPress: () => void;
}

export const TournamentCard = ({ tournament, onPress }: TournamentCardProps) => {
  return (
    <Card onPress={onPress} activeOpacity={0.8}>
      <TournamentImage source={{ uri: tournament.imageUrl }} />
      <TournamentOverlay>
        <TournamentTitle>
          {tournament.name} {tournament.year}
        </TournamentTitle>
      </TournamentOverlay>
    </Card>
  );
};
