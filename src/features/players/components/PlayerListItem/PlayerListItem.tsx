import React from 'react';
import { Avatar } from '~/components/Avatar/Avatar';
import type { GroupPlayer } from '~/services/apis/schemas';
import { Container, CountryFlag, CountryText, Info, InfoRow, NameText, OddsText } from './styles';

interface PlayerListItemProps {
  player: GroupPlayer;
  isSelected: boolean;
  onPress: () => void;
  showOdds?: boolean;
  odds?: string;
}

// Country code to flag emoji mapping
const getCountryFlag = (countryCode?: string): string => {
  if (!countryCode) return '🏳️';

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

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
