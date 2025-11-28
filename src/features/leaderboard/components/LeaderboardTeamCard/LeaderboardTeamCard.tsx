import { useState } from 'react';
import { useTheme } from 'styled-components/native';
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
  TeamInfo,
  TeamName,
  TotalScore,
} from './styles';

interface LeaderboardTeamCardProps {
  entry: LeaderboardEntry;
  isTopThree?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isCurrentUser?: boolean;
  currentUserNickname?: string;
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
  isTopThree = false,
  isFirst = false,
  isLast = false,
  isCurrentUser = false,
  currentUserNickname,
}: LeaderboardTeamCardProps) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const teamName = entry.name?.main ?? '';
  const ownerName = getOwnerDisplayName(entry, isCurrentUser, currentUserNickname);
  const bestScores = entry.bestScore ?? [];
  const players = entry.players ?? [];

  return (
    <Card
      isTopThree={isTopThree}
      isFirst={isFirst}
      isLast={isLast}
      onPress={toggleExpanded}
      activeOpacity={0.7}
    >
      <CardHeader>
        <RankBadge isTopThree={isTopThree}>
          <RankText isTopThree={isTopThree}>{entry.rank}</RankText>
        </RankBadge>

        <TeamInfo>
          <TeamName numberOfLines={1}>{teamName}</TeamName>
          <OwnerRow>
            {entry.prize > 0 ? (
              <PrizeContainer>
                <PrizeAmount>£{(entry.prize / 100).toLocaleString()}</PrizeAmount>
              </PrizeContainer>
            ) : null}
            <OwnerName numberOfLines={1}>{ownerName}</OwnerName>
          </OwnerRow>
        </TeamInfo>

        <ScoreContainer>
          <TotalScore>{formatScore(entry.total)}</TotalScore>
          <BestScoresLabel>Best 3</BestScoresLabel>
          <BestScores>
            {bestScores.length > 0 ? bestScores.map((score) => formatScore(score)).join(', ') : '-'}
          </BestScores>
        </ScoreContainer>

        <ExpandButton>
          <ExpandIcon>{isExpanded ? '▲' : '▼'}</ExpandIcon>
        </ExpandButton>
      </CardHeader>

      {isExpanded && (
        <>
          <Divider />
          <PlayersGrid>
            {players.map((player, index) => (
              <PlayerRow key={`${player.group}-${index}`}>
                <PlayerGroup>Group {player.group}</PlayerGroup>
                <PlayerName numberOfLines={1}>{player.player_name}</PlayerName>
                <PlayerScore style={{ color: getScoreColor(player.score, theme) }}>
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
};
