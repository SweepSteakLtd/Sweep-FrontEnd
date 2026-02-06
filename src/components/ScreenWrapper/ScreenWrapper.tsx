import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { CustomHeader } from '../CustomHeader/CustomHeader';
import { BackArrowIcon } from '../Icon/BackArrowIcon';
import {
  Container,
  OuterContainer,
  ProfileBalance,
  ProfileButton,
  StatusBarBackground,
} from './styles';

interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  showProfile?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftLogo?: React.ReactNode;
  rightLogo?: React.ReactNode;
  headerBackgroundColor?: string;
  contentBackgroundColor?: string;
  headerContentPaddingLeft?: number;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  title,
  showHeader = true,
  showBackButton = true,
  showProfile = false,
  leftComponent,
  rightComponent,
  leftLogo,
  rightLogo,
  headerBackgroundColor,
  contentBackgroundColor,
  headerContentPaddingLeft,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data: user } = useGetUser();

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Default title from route name if not provided (but not if title is explicitly empty string)
  const headerTitle = title === '' ? undefined : title || route.name;

  // Back button component
  const backButtonComponent = showBackButton ? (
    <Button
      variant="link"
      onPress={handleBackPress}
      fullWidth={false}
      icon={<BackArrowIcon size={18} color="white" />}
    />
  ) : null;

  // Profile component for Dashboard
  const profileComponent = showProfile ? (
    <ProfileButton onPress={handleProfilePress}>
      <ProfileBalance>{formatCurrency(user?.current_balance)}</ProfileBalance>
      <Avatar size={32} />
    </ProfileButton>
  ) : null;

  return (
    <OuterContainer contentBackgroundColor={contentBackgroundColor}>
      {showHeader && <StatusBarBackground backgroundColor={headerBackgroundColor} />}
      <Container>
        {showHeader && (
          <CustomHeader
            title={headerTitle}
            leftComponent={leftComponent || backButtonComponent}
            rightComponent={rightComponent || profileComponent}
            leftLogo={leftLogo}
            rightLogo={rightLogo}
            backgroundColor={headerBackgroundColor}
            contentPaddingLeft={headerContentPaddingLeft}
          />
        )}
        {children}
      </Container>
    </OuterContainer>
  );
};
