import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BackButton,
  BackButtonText,
  Container,
  HeaderContent,
  LeftSection,
  RightSection,
  SafeAreaContainer,
  Title,
} from './styles';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Calculate top padding: use safe area inset on iOS, status bar height on Android
  const topPadding = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  return (
    <SafeAreaContainer style={{ paddingTop: topPadding }}>
      <Container>
        <HeaderContent>
          <LeftSection>
            {showBackButton && (
              <BackButton onPress={handleBackPress}>
                <BackButtonText>‹</BackButtonText>
              </BackButton>
            )}
          </LeftSection>

          {title && <Title numberOfLines={1}>{title}</Title>}

          <RightSection>{rightComponent}</RightSection>
        </HeaderContent>
      </Container>
    </SafeAreaContainer>
  );
};
