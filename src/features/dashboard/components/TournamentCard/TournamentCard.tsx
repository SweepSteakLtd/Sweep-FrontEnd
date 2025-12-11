import { CoverCard } from '~/components/CoverCard/CoverCard';
import type { Tournament } from '~/services/apis/schemas';

interface TournamentCardProps {
  tournament: Tournament;
  onPress: () => void;
}

export const TournamentCard = ({ tournament, onPress }: TournamentCardProps) => {
  const year = tournament.starts_at ? new Date(tournament.starts_at).getFullYear() : '';

  return (
    <CoverCard
      imageUri={tournament.cover_picture}
      title={`${tournament.name} ${year}`}
      onPress={onPress}
      height={180}
      titleSize={18}
      titleWeight="700"
      overlayPadding={16}
    />
  );
};
