export type LeagueStatus = 'live' | 'upcoming' | 'finished';

export interface LeagueStatusInfo {
  status: LeagueStatus;
  timeText: string;
  daysRemaining: number;
}

/**
 * Calculate the status and time remaining for a league
 */
export const getLeagueStatus = (startTime: string, endTime: string): LeagueStatusInfo => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  // League is live if current time is between start and end
  if (now >= start && now <= end) {
    const daysRemaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      status: 'live',
      timeText: daysRemaining === 1 ? 'Ends in 1 day' : `Ends in ${daysRemaining} days`,
      daysRemaining,
    };
  }

  // League is upcoming if start time is in the future
  if (now < start) {
    const daysUntilStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      status: 'upcoming',
      timeText: daysUntilStart === 1 ? 'Starts in 1 day' : `Starts in ${daysUntilStart} days`,
      daysRemaining: daysUntilStart,
    };
  }

  // League is finished if end time is in the past
  return {
    status: 'finished',
    timeText: 'Ended',
    daysRemaining: 0,
  };
};

/**
 * Sort leagues by status: live first, then upcoming, then finished
 */
export const sortLeaguesByStatus = <T extends { start_time?: string; end_time?: string }>(
  leagues: T[],
): T[] => {
  return [...leagues].sort((a, b) => {
    // Handle missing dates by putting them at the end
    if (!a.start_time || !a.end_time) return 1;
    if (!b.start_time || !b.end_time) return -1;

    const statusA = getLeagueStatus(a.start_time, a.end_time);
    const statusB = getLeagueStatus(b.start_time, b.end_time);

    const statusOrder = { live: 0, upcoming: 1, finished: 2 };

    // Sort by status first
    if (statusOrder[statusA.status] !== statusOrder[statusB.status]) {
      return statusOrder[statusA.status] - statusOrder[statusB.status];
    }

    // Within same status, sort by time remaining (ascending for live/upcoming, descending for finished)
    if (statusA.status === 'finished') {
      return new Date(b.end_time).getTime() - new Date(a.end_time).getTime();
    }

    return statusA.daysRemaining - statusB.daysRemaining;
  });
};
