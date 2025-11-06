import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
import { Avatar } from '../Avatar/Avatar';
import { CustomHeader } from '../CustomHeader/CustomHeader';
import { Container, ProfileBalance, ProfileButton } from './styles';

interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  showProfile?: boolean;
  rightComponent?: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  title,
  showHeader = true,
  showBackButton = true,
  showProfile = false,
  rightComponent,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data: user } = useGetUser();

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  // Default title from route name if not provided
  const headerTitle = title || route.name;

  // Profile component for Dashboard
  const profileComponent = showProfile ? (
    <ProfileButton onPress={handleProfilePress}>
      <ProfileBalance>{formatCurrency(user?.current_balance)}</ProfileBalance>
      <Avatar size={32} />
    </ProfileButton>
  ) : null;

  return (
    <Container>
      {showHeader && (
        <CustomHeader
          title={headerTitle}
          showBackButton={showBackButton}
          rightComponent={rightComponent || profileComponent}
        />
      )}
      {children}
    </Container>
  );
};
