import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { BackHandler, Linking, ScrollView, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { Container, ContentCard, EmailText } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Support = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@sweepsteak.co.uk').catch((err) =>
      console.error('Failed to open email:', err),
    );
  };

  return (
    <ScreenWrapper title="Support">
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <ContentCard>
            <Text style={{ fontSize: 16, color: theme.colors.text.secondary, lineHeight: 24 }}>
              Contact support by emailing{' '}
              <EmailText onPress={handleEmailPress}>support@sweepsteak.co.uk</EmailText>.
            </Text>
          </ContentCard>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
