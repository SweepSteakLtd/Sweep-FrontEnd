import React from 'react';
import { Avatar } from '~/components/Avatar/Avatar';
import type { TeamPlayer } from '~/services/apis/Team/types';
import { getCountryFlag } from '~/utils/country';
import { Container, CountryFlag, CountryText, Info, InfoRow, NameText, OddsText } from './styles';

interface PlayerListItemProps {
  player: TeamPlayer;
  isSelected: boolean;
  onPress: () => void;
  showOdds?: boolean;
  odds?: string;
}

export const PlayerListItem: React.FC<PlayerListItemProps> = ({
  player,
  isSelected,
  onPress,
  showOdds = true,
  odds,
}) => {
  const flag = getCountryFlag(player.country);
  const displayOdds = odds || `${player.ranking}/1`;

  return (
    <Container onPress={onPress} $isSelected={isSelected}>
      <Avatar
        size={48}
        firstName={player.first_name}
        lastName={player.last_name}
        profilePicture={player.profile_picture}
        useCurrentUser={false}
      />

      <Info>
        <NameText>
          {player.first_name} {player.last_name}
        </NameText>
        <InfoRow>
          <CountryFlag>{flag}</CountryFlag>
          <CountryText>{player.country}</CountryText>
        </InfoRow>
      </Info>

      {showOdds && <OddsText>{displayOdds}</OddsText>}
    </Container>
  );
};
