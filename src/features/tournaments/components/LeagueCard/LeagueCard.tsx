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
  CardRow,
  DeleteButton,
  EntryFeeContainer,
  EntryFeeLabel,
  EntryFeeText,
  GameName,
  InfoLabel,
  LiveDot,
  NameRow,
  PrivatePill,
  PrivatePillText,
  StatusContainer,
  StatusText,
  TimeText,
  TournamentInfo,
} from './styles';

interface LeagueCardProps {
  league: League;
  index: number;
  onPress: () => void;
  onDelete?: (leagueId: string) => void;
}

export const LeagueCard = ({ league, onPress, onDelete }: LeagueCardProps) => {
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

  // Total pot is 90% of entry fees collected (platform keeps 10%)
  const currentEntries = league.joined_players?.length || 0;
  const totalEntryFees = (league.entry_fee ?? 0) * currentEntries;
  const totalPot = Math.floor(totalEntryFees * 0.9);

  const leagueStatus =
    league.start_time && league.end_time
      ? getLeagueStatus(league.start_time, league.end_time)
      : null;
  const isLive = leagueStatus?.status === 'live';
  const isFinished = leagueStatus?.status === 'finished';
  const isPrivate = league.type === 'private';

  const cardContent = (
    <Card onPress={onPress} activeOpacity={0.7} isFinished={isFinished}>
      <CardContainer>
        {/* Row 1: Name + Private pill | Amount */}
        <CardRow>
          <NameRow>
            <GameName isLive={isLive}>
              {league.name}
            </GameName>
            {isPrivate && (
              <PrivatePill>
                <PrivatePillText>Private</PrivatePillText>
              </PrivatePill>
            )}
          </NameRow>
          <AmountText>{formatCurrency(totalPot)}</AmountText>
        </CardRow>

        {/* Row 2: Description | Entries */}
        <CardRow>
          <TournamentInfo numberOfLines={1}>{league.description || ' '}</TournamentInfo>
          <InfoLabel>
            {currentEntries} {currentEntries === 1 ? 'entry' : 'entries'}
          </InfoLabel>
        </CardRow>

        {/* Row 3: Status | Entry fee */}
        <CardRow>
          {leagueStatus ? (
            <StatusContainer>
              {isLive && <LiveDot />}
              {isLive && <StatusText isLive>{leagueStatus.status.toUpperCase()}</StatusText>}
              <TimeText>{leagueStatus.timeText}</TimeText>
            </StatusContainer>
          ) : (
            <StatusContainer />
          )}
          <EntryFeeContainer>
            <EntryFeeLabel>Entry fee:</EntryFeeLabel>
            <EntryFeeText>{formatCurrency(league.entry_fee ?? 0)}</EntryFeeText>
          </EntryFeeContainer>
        </CardRow>
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
