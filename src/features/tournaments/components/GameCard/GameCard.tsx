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

interface GameCardProps {
  game: Game;
  index: number;
  onPress: () => void;
}

export const GameCard = ({ game, onPress }: GameCardProps) => {
  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString()}`;
  };

  return (
    <Card onPress={onPress} activeOpacity={0.7}>
      <CardContainer>
        <LeftSection>
          <GameName>{game.name}</GameName>
          <TournamentInfo>
            {game.tournamentName} {game.tournamentYear}
          </TournamentInfo>
        </LeftSection>

        <RightSection>
          <AmountText>{formatCurrency(game.totalPot || 0)}</AmountText>
          <PlayersText>
            <InfoLabel>{game.currentParticipants || 0} players</InfoLabel>
          </PlayersText>
        </RightSection>
      </CardContainer>
    </Card>
  );
};
