import React from 'react';
import { Avatar } from '~/components/Avatar/Avatar';
import type { TeamPlayer } from '~/services/apis/Team/types';
import { getCountryFlag } from '~/utils/country';
import {
  CardContainer,
  CountryFlag,
  CountryText,
  PlayerName,
  SelectedIndicator,
  SelectedIndicatorText,
} from './styles';

interface PlayerSelectionCardProps {
  player: TeamPlayer;
  isSelected: boolean;
  onPress: () => void;
}

export const PlayerSelectionCard: React.FC<PlayerSelectionCardProps> = ({
  player,
  isSelected,
  onPress,
}) => {
  const flag = getCountryFlag(player.country);

  return (
    <CardContainer onPress={onPress} $isSelected={isSelected}>
      {isSelected && (
        <SelectedIndicator>
          <SelectedIndicatorText>✓</SelectedIndicatorText>
        </SelectedIndicator>
      )}
      <Avatar
        size={56}
        firstName={player.first_name}
        lastName={player.last_name}
        profilePicture={player.profile_picture}
        useCurrentUser={false}
      />
      <PlayerName numberOfLines={2}>
        {player.first_name} {player.last_name}
      </PlayerName>
      <CountryFlag>{flag}</CountryFlag>
      <CountryText>{player.country}</CountryText>
    </CardContainer>
  );
};
