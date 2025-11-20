import React from 'react';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { AvatarContainer, AvatarImage, AvatarText } from './styles';

interface AvatarProps {
  size?: number;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  useCurrentUser?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 80,
  firstName,
  lastName,
  profilePicture,
  useCurrentUser = true,
}) => {
  const { data: user } = useGetUser();

  // Use provided props or fall back to current user
  const first = firstName || (useCurrentUser ? user?.first_name : '') || '';
  const last = lastName || (useCurrentUser ? user?.last_name : '') || '';
  const picture = profilePicture || (useCurrentUser ? user?.profile_picture : undefined);

  const getInitials = () => {
    if (!first && !last) return '?';
    const initials = `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    return initials || '?';
  };

  const initials = getInitials();

  // Show initials if no profile picture
  const showInitials = !picture;

  return (
    <AvatarContainer size={size}>
      {showInitials ? (
        <AvatarText size={size}>{initials}</AvatarText>
      ) : (
        <AvatarImage source={{ uri: picture }} size={size} resizeMode="cover" />
      )}
    </AvatarContainer>
  );
};
