import { CoverCard } from '~/components/CoverCard/CoverCard';
import type { Tournament } from '~/services/apis/schemas';

interface TournamentCardProps {
  tournament: Tournament;
  onPress: () => void;
}

const formatCurrency = (amount?: number): string => {
  if (!amount) return '£0.00';
  return `£${(amount / 100).toFixed(2)}`;
};

export const TournamentCard = ({ tournament, onPress }: TournamentCardProps) => {
  const totalStaked = formatCurrency(tournament.total_staked);

  return (
    <CoverCard
      imageUri={tournament.cover_picture}
      title={`${tournament.name}`}
      subtitle={`Total Staked: ${totalStaked}`}
      onPress={onPress}
      height={180}
      titleSize={18}
      titleWeight="700"
      overlayPadding={16}
      accentColor={tournament.colours?.primary}
      showLiveBadge={tournament.is_live ?? false}
      showFinishedBadge={tournament.is_finished ?? false}
      startsAt={tournament.starts_at}
    />
  );
};
