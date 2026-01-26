import React from 'react';
import {
  FinishedBadge,
  FinishedText,
  LiveBadge,
  LiveDot,
  LiveText,
  StartsInBadge,
  StartsInText,
} from './styles';

interface TournamentBadgesProps {
  isLive?: boolean;
  isFinished?: boolean;
  startsAt?: string;
}

const getTimeUntilStart = (startDate?: string): string | undefined => {
  if (!startDate) return undefined;

  const now = new Date();
  const start = new Date(startDate);
  const diffMs = start.getTime() - now.getTime();

  // If tournament has already started, don't show badge
  if (diffMs <= 0) return undefined;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) {
    return `Starts in ${diffDays}d`;
  } else if (diffHours > 0) {
    return `Starts in ${diffHours}h`;
  } else if (diffMinutes > 0) {
    return `Starts in ${diffMinutes}m`;
  }
  return 'Starting soon';
};

export const TournamentBadges: React.FC<TournamentBadgesProps> = ({
  isLive,
  isFinished,
  startsAt,
}) => {
  const startsInText = getTimeUntilStart(startsAt);

  if (isLive) {
    return (
      <LiveBadge>
        <LiveDot />
        <LiveText>Live</LiveText>
      </LiveBadge>
    );
  }

  if (isFinished) {
    return (
      <FinishedBadge>
        <FinishedText>Finished</FinishedText>
      </FinishedBadge>
    );
  }

  if (startsInText) {
    return (
      <StartsInBadge>
        <StartsInText>{startsInText}</StartsInText>
      </StartsInBadge>
    );
  }

  return null;
};
