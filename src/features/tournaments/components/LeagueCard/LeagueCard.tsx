import { TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Typography } from '~/components/Typography/Typography';
import type { League } from '~/services/apis/League/types';
import { formatCurrency } from '~/utils/currency';
import { getLeagueStatus } from '~/utils/leagueStatus';
import {
  AmountText,
  Card,
  CardContainer,
  DeleteButton,
  GameName,
  InfoLabel,
  LeftSection,
  LiveDot,
  PlayersText,
  RightSection,
  StatusContainer,
  StatusText,
  TimeText,
  TournamentInfo,
} from './styles';

interface LeagueCardProps {
  league: League;
  tournamentName?: string;
  index: number;
  onPress: () => void;
  onDelete?: (leagueId: string) => void;
}

export const LeagueCard = ({ league, tournamentName = '', onPress, onDelete }: LeagueCardProps) => {
  const theme = useTheme();
  const { showAlert } = useAlert();

  const handleDelete = () => {
    if (!league.id) return;

    showAlert({
      title: 'Delete League',
      message: `Are you sure you want to delete "${league.name}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(league.id!),
        },
      ],
    });
  };

  const totalPot = (league.entry_fee ?? 0) * (league.max_participants ?? 0);
  const year = league.start_time ? new Date(league.start_time).getFullYear() : new Date().getFullYear();

  const leagueStatus =
    league.start_time && league.end_time ? getLeagueStatus(league.start_time, league.end_time) : null;
  const isLive = leagueStatus?.status === 'live';
  const isFinished = leagueStatus?.status === 'finished';

  const cardContent = (
    <Card onPress={onPress} activeOpacity={0.7} isFinished={isFinished}>
      <CardContainer>
        <LeftSection>
          <GameName isLive={isLive}>{league.name}</GameName>
          <TournamentInfo>
            {tournamentName} {year}
          </TournamentInfo>
          {leagueStatus && (
            <StatusContainer>
              {isLive && <LiveDot />}
              {isLive && <StatusText isLive>{leagueStatus.status.toUpperCase()}</StatusText>}
              <TimeText>{leagueStatus.timeText}</TimeText>
            </StatusContainer>
          )}
        </LeftSection>

        <RightSection>
          <AmountText>{formatCurrency(totalPot)}</AmountText>
          <PlayersText>
            <InfoLabel>{league.user_id_list?.length || 0} players</InfoLabel>
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
