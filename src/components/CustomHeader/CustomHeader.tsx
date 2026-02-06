import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Container,
  HeaderContent,
  LeftSection,
  RightSection,
  SafeAreaContainer,
  Title,
} from './styles';

interface CustomHeaderProps {
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftLogo?: React.ReactNode;
  rightLogo?: React.ReactNode;
  backgroundColor?: string;
  contentPaddingLeft?: number;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftComponent,
  rightComponent,
  leftLogo,
  rightLogo,
  backgroundColor,
  contentPaddingLeft,
}) => {
  const insets = useSafeAreaInsets();

  // Calculate top padding: use safe area inset on iOS, status bar height on Android
  const topPadding = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  return (
    <SafeAreaContainer style={{ paddingTop: topPadding }} backgroundColor={backgroundColor}>
      <Container backgroundColor={backgroundColor}>
        <HeaderContent paddingLeft={contentPaddingLeft}>
          <LeftSection>
            {leftComponent}
            {leftLogo}
          </LeftSection>
          {title && <Title>{title}</Title>}
          <RightSection>
            {rightLogo}
            {rightComponent}
          </RightSection>
        </HeaderContent>
      </Container>
    </SafeAreaContainer>
  );
};
