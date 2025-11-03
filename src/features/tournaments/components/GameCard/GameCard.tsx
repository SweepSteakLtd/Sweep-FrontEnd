import { TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Typography } from '~/components/Typography/Typography';
import type { Game } from '~/services/apis/League/types';
import {
  AmountText,
  Card,
  CardContainer,
  DeleteButton,
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
  onDelete?: (gameId: string) => void;
}

export const GameCard = ({ game, tournamentName = '', onPress, onDelete }: GameCardProps) => {
  const theme = useTheme();
  const { showAlert } = useAlert();

  const formatCurrency = (amount: number) => {
    return `£${amount.toLocaleString()}`;
  };

  const handleDelete = () => {
    if (!game.id) return;

    showAlert({
      title: 'Delete Game',
      message: `Are you sure you want to delete "${game.name}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(game.id!),
        },
      ],
    });
  };

  const totalPot = (game.entry_fee ?? 0) * (game.max_participants ?? 0);
  const year = game.start_time ? new Date(game.start_time).getFullYear() : new Date().getFullYear();

  const cardContent = (
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

  // Show delete if onDelete callback is provided
  if (!onDelete) {
    return cardContent;
  }

  const renderRightActions = () => {
    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
        <DeleteButton>
          <Typography variant="body" weight="bold" style={{ color: theme.colors.white }}>
            Delete
          </Typography>
        </DeleteButton>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      rightThreshold={40}
    >
      {cardContent}
    </Swipeable>
  );
};
