import React from 'react';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { AvatarContainer, AvatarImage, AvatarText } from './styles';

interface AvatarProps {
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 80 }) => {
  const { data: user } = useGetUser();

  const getInitials = () => {
    if (!user) return '?';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    return initials || '?';
  };

  const initials = getInitials();

  // Show initials if no profile picture
  // const showInitials = !user?.profile_picture;
  const showInitials = true;

  return (
    <AvatarContainer size={size}>
      {showInitials ? (
        <AvatarText size={size}>{initials}</AvatarText>
      ) : (
        <AvatarImage source={{ uri: user?.profile_picture }} size={size} resizeMode="cover" />
      )}
    </AvatarContainer>
  );
};
