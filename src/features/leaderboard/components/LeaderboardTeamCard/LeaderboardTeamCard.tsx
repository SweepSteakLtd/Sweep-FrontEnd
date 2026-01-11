import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { formatScore, getScoreColor } from '../../utils/scoreUtils';
import {
  // BestScores,
  // BestScoresLabel,
  Card,
  CardHeader,
  Divider,
  ExpandButton,
  ExpandIcon,
  OwnerName,
  OwnerRow,
  PinIcon,
  PlayerGroup,
  PlayerName,
  PlayerRow,
  PlayerScore,
  PlayersGrid,
  PrizeAmount,
  PrizeContainer,
  RankBadge,
  RankText,
  ScoreContainer,
  SwipeActionButton,
  SwipeActionText,
  TeamInfo,
  TeamName,
  TeamNameRow,
  TotalScore,
} from './styles';

interface LeaderboardTeamCardProps {
  entry: LeaderboardEntry;
  entryId: string;
  isTopThree?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isCurrentUser?: boolean;
  currentUserNickname?: string;
  /** Whether the card can be expanded to show players (disabled before tournament starts) */
  canExpand?: boolean;
  /** Whether this team is pinned */
  isPinned?: boolean;
  /** Whether this team can be pinned (not own team, tournament started) */
  canPin?: boolean;
  /** Callback to toggle pin state */
  onTogglePin?: () => void;
  /** ID of the currently open swipeable (for single-open behavior) */
  openSwipeableId?: string | null;
  /** Callback when this swipeable opens */
  onSwipeableOpen?: (id: string) => void;
  /** Whether this is The Open tournament (for special styling) */
  isOpenTournament?: boolean;
  /** Whether this is The Masters tournament (for special styling) */
  isMastersTournament?: boolean;
  /** Whether this is a PGA tournament (for special styling) */
  isPGATournament?: boolean;
}

/**
 * Get the display name for the team owner
 * - Prefer nickname for everyone
 * - For current user, use their nickname from user profile
 * - If no nickname, show full name (from substring)
 */
const getOwnerDisplayName = (
  entry: LeaderboardEntry,
  isCurrentUser: boolean,
  currentUserNickname?: string,
): string => {
  const { substring, nickname } = entry.name;

  // For current user, prefer their profile nickname
  if (isCurrentUser && currentUserNickname) {
    return currentUserNickname;
  }

  // Prefer nickname from entry if available
  if (nickname) {
    return nickname;
  }

  // Fallback to full name
  return substring ?? '';
};

export const LeaderboardTeamCard = ({
  entry,
  entryId,
  isTopThree = false,
  isFirst = false,
  isLast = false,
  isCurrentUser = false,
  currentUserNickname,
  canExpand = true,
  isPinned = false,
  canPin = false,
  onTogglePin,
  openSwipeableId,
  onSwipeableOpen,
  isOpenTournament = false,
  isMastersTournament = false,
  isPGATournament = false,
}: LeaderboardTeamCardProps) => {
  const { tournamentTheme } = useTournamentTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);

  // Close this swipeable if another one opens
  useEffect(() => {
    if (openSwipeableId && openSwipeableId !== entryId) {
      swipeableRef.current?.close();
    }
  }, [openSwipeableId, entryId]);

  const toggleExpanded = () => {
    if (canExpand) {
      setIsExpanded(!isExpanded);
    }
  };

  const handlePinPress = () => {
    swipeableRef.current?.close();
    onTogglePin?.();
  };

  const handleSwipeableOpen = () => {
    onSwipeableOpen?.(entryId);
  };

  const teamName = entry.name?.main ?? '';
  const ownerName = getOwnerDisplayName(entry, isCurrentUser, currentUserNickname);
  // API returns `bestScore` (camelCase). Default to [] so mocks/older payloads won't crash.
  // const bestScores = entry.bestScore ?? [];
  const players = entry.players ?? [];

  const renderRightActions = () => {
    if (!canPin) return null;

    return (
      <TouchableOpacity onPress={handlePinPress} activeOpacity={0.8}>
        <SwipeActionButton isPinned={isPinned}>
          <PinIcon
            isPinned={false}
            isOpenTournament={isOpenTournament}
            isMastersTournament={isMastersTournament}
          >
            {isPinned ? '📌' : '📍'}
          </PinIcon>
          <SwipeActionText>{isPinned ? 'Unpin' : 'Pin'}</SwipeActionText>
        </SwipeActionButton>
      </TouchableOpacity>
    );
  };

  const cardContent = (
    <Card
      isTopThree={isTopThree}
      isFirst={isFirst}
      isLast={isLast}
      isOpenTournament={isOpenTournament}
      isMastersTournament={isMastersTournament}
      isPGATournament={isPGATournament}
      onPress={canExpand ? toggleExpanded : undefined}
      activeOpacity={canExpand ? 0.7 : 1}
      disabled={!canExpand}
    >
      <CardHeader>
        <RankBadge
          isTopThree={isTopThree}
          isMastersTournament={isMastersTournament}
          primaryColor={tournamentTheme.primary}
        >
          <RankText isTopThree={isTopThree} isMastersTournament={isMastersTournament}>
            {entry.rank}
          </RankText>
        </RankBadge>

        <TeamInfo>
          <TeamNameRow>
            <TeamName isOpenTournament={isOpenTournament} isMastersTournament={isMastersTournament}>
              {teamName}
            </TeamName>
            {entry.prize > 0 && (
              <PrizeContainer>
                <PrizeAmount>£{(entry.prize / 100).toLocaleString()}</PrizeAmount>
              </PrizeContainer>
            )}
          </TeamNameRow>
          <OwnerRow>
            <OwnerName
              isOpenTournament={isOpenTournament}
              isMastersTournament={isMastersTournament}
              isPGATournament={isPGATournament}
              numberOfLines={1}
            >
              {ownerName}
            </OwnerName>
            {isPinned && (
              <PinIcon
                isPinned
                isOpenTournament={isOpenTournament}
                isMastersTournament={isMastersTournament}
                isPGATournament={isPGATournament}
              >
                📌
              </PinIcon>
            )}
          </OwnerRow>
        </TeamInfo>

        <ScoreContainer isMastersTournament={isMastersTournament}>
          <TotalScore
            isOpenTournament={isOpenTournament}
            isMastersTournament={isMastersTournament}
            isPGATournament={isPGATournament}
            style={{
              color: getScoreColor(entry.total),
              fontWeight: entry.total !== null && entry.total < 0 ? '900' : '700',
            }}
          >
            {formatScore(entry.total)}
          </TotalScore>
          {/* Commented out - may be needed in the future
          <BestScoresLabel
            isOpenTournament={isOpenTournament}
            isMastersTournament={isMastersTournament}
          >
            Best {bestScores.length}
          </BestScoresLabel>
          <BestScores
            isOpenTournament={isOpenTournament}
            isMastersTournament={isMastersTournament}
            isPGATournament={isPGATournament}
          >
            {bestScores.length > 0 ? (
              <>
                {bestScores.map((score, index) => (
                  <Text
                    key={index}
                    style={{
                      color: getScoreColor(score),
                      fontWeight: score !== null && score < 0 ? '900' : 'normal',
                      fontSize: 9,
                    }}
                  >
                    {formatScore(score)}
                    {index < bestScores.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </>
            ) : (
              '-'
            )}
          </BestScores>
          */}
        </ScoreContainer>

        {canExpand && (
          <ExpandButton>
            <ExpandIcon
              isOpenTournament={isOpenTournament}
              isMastersTournament={isMastersTournament}
            >
              {isExpanded ? '▲' : '▼'}
            </ExpandIcon>
          </ExpandButton>
        )}
      </CardHeader>

      {canExpand && isExpanded && (
        <>
          <Divider isMastersTournament={isMastersTournament} />
          <PlayersGrid>
            {players.map((player, index) => (
              <PlayerRow key={`${player.group}-${index}`}>
                <PlayerGroup
                  isOpenTournament={isOpenTournament}
                  isMastersTournament={isMastersTournament}
                  isPGATournament={isPGATournament}
                >
                  Group {player.group}
                </PlayerGroup>
                <PlayerName
                  isOpenTournament={isOpenTournament}
                  isMastersTournament={isMastersTournament}
                  numberOfLines={1}
                >
                  {player.player_name}
                </PlayerName>
                <PlayerScore
                  isOpenTournament={isOpenTournament}
                  isMastersTournament={isMastersTournament}
                  isPGATournament={isPGATournament}
                  style={{
                    color: getScoreColor(player.score),
                    fontWeight: player.score !== null && player.score < 0 ? '900' : '600',
                  }}
                >
                  {formatScore(player.score)}
                  {player.status === 'F' ? ' (F)' : ''}
                </PlayerScore>
              </PlayerRow>
            ))}
          </PlayersGrid>
        </>
      )}
    </Card>
  );

  // Only wrap in Swipeable if pinning is available
  if (!canPin) {
    return cardContent;
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      rightThreshold={40}
      onSwipeableWillOpen={handleSwipeableOpen}
    >
      {cardContent}
    </Swipeable>
  );
};
