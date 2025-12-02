import React from 'react';
import { Avatar } from '~/components/Avatar/Avatar';
import type { TeamPlayer } from '~/services/apis/Team/types';
import { AvatarWrapper, Container } from './styles';

interface PlayerAvatarStackProps {
  players: TeamPlayer[];
  maxDisplay?: number;
}

export const PlayerAvatarStack: React.FC<PlayerAvatarStackProps> = ({
  players,
  maxDisplay = 5,
}) => {
  const displayPlayers = players.slice(0, maxDisplay);

  if (displayPlayers.length === 0) {
    return null;
  }

  return (
    <Container>
      {displayPlayers.map((player, index) => (
        <AvatarWrapper key={player.id} style={{ zIndex: displayPlayers.length - index }}>
          <Avatar
            size={32}
            firstName={player.first_name}
            lastName={player.last_name}
            profilePicture={player.profile_picture}
            useCurrentUser={false}
          />
        </AvatarWrapper>
      ))}
    </Container>
  );
};
