import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { useTournamentTheme } from '~/context/TournamentThemeContext';
import type { LeaderboardEntry } from '~/services/apis/Leaderboard/types';
import { formatScore, getScoreColor } from '../../utils/scoreUtils';
import {
  BestScores,
  BestScoresLabel,
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
  const theme = useTheme();
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
  const bestScores = entry.bestScore ?? [];
  const players = entry.players ?? [];

  const renderRightActions = () => {
    if (!canPin) return null;

    return (
      <TouchableOpacity onPress={handlePinPress} activeOpacity={0.8}>
        <SwipeActionButton isPinned={isPinned}>
          <PinIcon isPinned={false}>{isPinned ? '📌' : '📍'}</PinIcon>
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
      isPGATournament={isPGATournament}
      onPress={toggleExpanded}
      activeOpacity={0.7}
    >
      <CardHeader>
        <RankBadge isTopThree={isTopThree} primaryColor={tournamentTheme.primary}>
          <RankText isTopThree={isTopThree}>{entry.rank}</RankText>
        </RankBadge>

        <TeamInfo>
          <TeamName numberOfLines={1}>{teamName}</TeamName>
          <OwnerRow>
            {entry.prize > 0 ? (
              <PrizeContainer>
                <PrizeAmount isPGATournament={isPGATournament}>£{(entry.prize / 100).toLocaleString()}</PrizeAmount>
              </PrizeContainer>
            ) : null}
            <OwnerName isPGATournament={isPGATournament} numberOfLines={1}>{ownerName}</OwnerName>
            {isPinned && <PinIcon isPinned isPGATournament={isPGATournament}>📌</PinIcon>}
          </OwnerRow>
        </TeamInfo>

        <ScoreContainer isMastersTournament={isMastersTournament}>
          <TotalScore isMastersTournament={isMastersTournament} isPGATournament={isPGATournament}>{formatScore(entry.total)}</TotalScore>
          <BestScoresLabel isMastersTournament={isMastersTournament}>Best {bestScores.length}</BestScoresLabel>
          <BestScores isMastersTournament={isMastersTournament} isPGATournament={isPGATournament}>
            {bestScores.length > 0 ? bestScores.map((score) => formatScore(score)).join(', ') : '-'}
          </BestScores>
        </ScoreContainer>

        {canExpand && (
          <ExpandButton>
            <ExpandIcon>{isExpanded ? '▲' : '▼'}</ExpandIcon>
          </ExpandButton>
        )}
      </CardHeader>

      {canExpand && isExpanded && (
        <>
          <Divider />
          <PlayersGrid>
            {players.map((player, index) => (
              <PlayerRow key={`${player.group}-${index}`}>
                <PlayerGroup isPGATournament={isPGATournament}>Group {player.group}</PlayerGroup>
                <PlayerName numberOfLines={1}>{player.player_name}</PlayerName>
                <PlayerScore isPGATournament={isPGATournament} style={{ color: getScoreColor(player.score, theme) }}>
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
