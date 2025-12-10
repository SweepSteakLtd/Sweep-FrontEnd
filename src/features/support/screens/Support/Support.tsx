import { Linking, ScrollView, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Container, ContentCard, EmailText } from './styles';

export const Support = () => {
  const theme = useTheme();

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
