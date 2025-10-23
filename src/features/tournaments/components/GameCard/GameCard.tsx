import type { Game } from '~/services/apis/Game/types';
import {
  AmountText,
  Card,
  CardContainer,
  GameName,
  InfoLabel,
  LeftSection,
  PlayersText,
  RightSection,
  TournamentInfo,
} from './styles';

interface GameCardProps {
  game: Game;
  tournamentName?: string;
  index: number;
  onPress: () => void;
}

export const GameCard = ({ game, tournamentName = '', onPress }: GameCardProps) => {
  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString()}`;
  };

  const totalPot = (game.entry_fee ?? 0) * (game.max_participants ?? 0);
  const year = game.start_time ? new Date(game.start_time).getFullYear() : new Date().getFullYear();

  return (
    <Card onPress={onPress} activeOpacity={0.7}>
      <CardContainer>
        <LeftSection>
          <GameName>{game.name}</GameName>
          <TournamentInfo>
            {tournamentName} {year}
          </TournamentInfo>
        </LeftSection>

        <RightSection>
          <AmountText>{formatCurrency(totalPot)}</AmountText>
          <PlayersText>
            <InfoLabel>{game.user_id_list?.length || 0} players</InfoLabel>
          </PlayersText>
        </RightSection>
      </CardContainer>
    </Card>
  );
};
