import React from 'react';
import { Avatar } from '~/components/Avatar/Avatar';
import type { PlayerProfile } from '~/services/apis/schemas';
import { AvatarWrapper, Container, EmptyText, ScrollContainer } from './styles';

interface SelectedPlayersListProps {
  players: PlayerProfile[];
  selectedPlayerIds: string[];
}

export const SelectedPlayersList: React.FC<SelectedPlayersListProps> = ({
  players,
  selectedPlayerIds,
}) => {
  const selectedPlayers = players.filter((player) => selectedPlayerIds.includes(player.id || ''));

  if (selectedPlayers.length === 0) {
    return (
      <Container>
        <EmptyText>No players selected</EmptyText>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16, paddingLeft: 8 }}
      >
        {selectedPlayers.map((player, index) => (
          <AvatarWrapper key={player.id} style={{ zIndex: selectedPlayers.length - index }}>
            <Avatar
              size={40}
              firstName={player.first_name}
              lastName={player.last_name}
              profilePicture={player.profile_picture}
              useCurrentUser={false}
            />
          </AvatarWrapper>
        ))}
      </ScrollContainer>
    </Container>
  );
};
