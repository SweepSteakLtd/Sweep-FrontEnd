import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Icon } from '~/components/Icon';
import { Typography } from '~/components/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { useTheme } from 'styled-components/native';
import { Container, ContentCard, Footer, Header, IconContainer, ScrollContainer } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TermsAndConditions'>;
type RouteProp = NativeStackScreenProps<RootStackParamList, 'TermsAndConditions'>['route'];

export const TermsAndConditions = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const [accepted, setAccepted] = useState(false);

  const { nextScreen } = route.params;

  const handleAccept = () => {
    if (accepted) {
      navigation.navigate(nextScreen);
    }
  };

  return (
    <Container>
      <Header>
        <IconContainer>
          <Icon name="📄" size={30} />
        </IconContainer>
        <Typography variant="heading" color={theme.colors.white}>
          Terms & Conditions
        </Typography>
      </Header>

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <ContentCard>
          <Typography variant="subheading" color={theme.colors.text.secondary} style={{ marginBottom: 15 }}>
            Sweepsteak Ltd Terms and Conditions
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
            By registering for an account with Sweepsteak Ltd ("we," "us," or "our") and accessing and using our website and services, users ("you," "your") agree to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, do not use our services.
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            2. Eligibility
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • You must be at least 18 years old
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • You must be a resident of the United Kingdom
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • You must not be self-excluded or prohibited from gambling under any jurisdiction
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • You must not be a professional golfer competing in any professional tour at the time of entry
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • We reserve the right to request proof of identity and address
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            3. Account Registration
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
            To use our services, you must register an account. You must provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account and password. You are responsible for all activities that occur under your account.
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Only one account per person is permitted
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Duplicate accounts will be closed, and any winnings may be forfeited
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Confirm your age upon registration
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Agree to these Terms, the Privacy Policy and Gambling Rules
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            4. Use of the Platform
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
            We reserve the right to suspend or close accounts if we believe you have breached these Terms and Conditions.
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Creating or using multiple accounts will result in the immediate closure of all accounts
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Collusion with any other participant is strictly forbidden
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • We reserve the right to request proof of identity and address
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginLeft: 10, marginBottom: 4 }}>
            • Credit/debit cards must belong to the name holder
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            5. Financial Transactions
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
            All financial transactions are processed securely. We are not liable for any losses you incur as a result of any transaction or banking services.
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            6. Liability
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
            We are not responsible for any losses or damages incurred through the use of our services. We make no warranties about the accuracy, reliability, or availability of the platform.
          </Typography>

          <Typography variant="body" color={theme.colors.text.secondary} weight="600" style={{ marginTop: 12, marginBottom: 6 }}>
            7. Governing Law
          </Typography>
          <Typography variant="body" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
            These Terms and Conditions are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
          </Typography>
        </ContentCard>
      </ScrollContainer>

      <Footer>
        <Checkbox checked={accepted} onPress={() => setAccepted(!accepted)}>
          <Typography variant="caption" color={theme.colors.white}>
            I confirm that I am 18 years or older and I have read, understand and agree to Sweepsteak Ltd{' '}
            <Typography variant="caption" color={theme.colors.white} style={{ textDecorationLine: 'underline' }}>
              Terms and Conditions
            </Typography>
            ,{' '}
            <Typography variant="caption" color={theme.colors.white} style={{ textDecorationLine: 'underline' }}>
              Privacy Policy
            </Typography>
            . I understand this is a sweepstake platform with skill-based elements.
          </Typography>
        </Checkbox>

        <Button disabled={!accepted} onPress={handleAccept} style={{ marginTop: 15 }}>
          {accepted
            ? (nextScreen === 'CreateAccount' ? 'Accept & Create Account' : 'Accept & Continue to Login')
            : 'Please Accept Terms to Continue'
          }
        </Button>
      </Footer>
    </Container>
  );
};
