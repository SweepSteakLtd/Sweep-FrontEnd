import React from 'react';
import { Avatar } from '~/components/Avatar/Avatar';
import type { TeamPlayer } from '~/services/apis/Team/types';
import {
  CardContainer,
  GroupBadge,
  GroupText,
  PlaceholderAvatar,
  PlaceholderIcon,
  PlaceholderText,
  PlayerName,
  RemoveButton,
  RemoveText,
} from './styles';

interface SelectedPlayerCardProps {
  player: TeamPlayer;
  onRemove?: () => void;
  disabled?: boolean;
}

export const SelectedPlayerCard: React.FC<SelectedPlayerCardProps> = ({
  player,
  onRemove,
  disabled = false,
}) => {
  return (
    <CardContainer>
      {onRemove && !disabled && (
        <RemoveButton onPress={onRemove}>
          <RemoveText>×</RemoveText>
        </RemoveButton>
      )}
      <Avatar
        size={44}
        firstName={player.first_name}
        lastName={player.last_name}
        profilePicture={player.profile_picture}
        useCurrentUser={false}
      />
      <PlayerName numberOfLines={1}>
        {player.first_name?.[0]}. {player.last_name}
      </PlayerName>
      <GroupBadge>
        <GroupText>Group {player.group}</GroupText>
      </GroupBadge>
    </CardContainer>
  );
};

interface PlaceholderCardProps {
  groupName: string;
}

export const PlaceholderPlayerCard: React.FC<PlaceholderCardProps> = ({ groupName }) => {
  return (
    <CardContainer $isPlaceholder>
      <PlaceholderAvatar>
        <PlaceholderIcon>?</PlaceholderIcon>
      </PlaceholderAvatar>
      <PlaceholderText numberOfLines={1}>Select player</PlaceholderText>
      <GroupBadge>
        <GroupText>Group {groupName}</GroupText>
      </GroupBadge>
    </CardContainer>
  );
};
