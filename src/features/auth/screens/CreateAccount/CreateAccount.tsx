import { useState } from 'react';
import { Button } from '~/components/Button';
import { Icon } from '~/components/Icon';
import { Typography } from '~/components/Typography';
import { useTheme } from '~/theme/ThemeProvider';
import { Container, Header, IconContainer, OptionCard, OptionContent, OptionsContainer } from './styles';

type DepositMethod = 'instant' | 'manual' | null;

export const CreateAccount = () => {
  const theme = useTheme();
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod>(null);

  const handleContinue = () => {
    if (selectedMethod) {
      // Navigate to signup form or next step
      console.log('Selected method:', selectedMethod);
      // TODO: Navigate to signup form with selected method
    }
  };

  return (
    <Container>
      <Header>
        <Typography variant="title" color={theme.colors.white}>
          Create Account
        </Typography>
      </Header>

      <OptionsContainer>
        <OptionCard onPress={() => setSelectedMethod('instant')}>
          <IconContainer>
            <Icon name="📱" size={24} />
          </IconContainer>
          <OptionContent>
            <Typography variant="subheading" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
              Instant Deposit
            </Typography>
            <Typography variant="body" color={theme.colors.text.muted}>
              Connect all your socials in seconds with our instant banking app installed on their phone.
            </Typography>
          </OptionContent>
        </OptionCard>

        <OptionCard onPress={() => setSelectedMethod('manual')}>
          <IconContainer>
            <Icon name="🏦" size={24} />
          </IconContainer>
          <OptionContent>
            <Typography variant="subheading" color={theme.colors.text.secondary} style={{ marginBottom: 8 }}>
              Manual Deposit
            </Typography>
            <Typography variant="body" color={theme.colors.text.muted}>
              A slightly longer verification process using open banking technology. You will not need your banking app installed on their phone.
            </Typography>
          </OptionContent>
        </OptionCard>
      </OptionsContainer>

      <Typography variant="body" color={theme.colors.white} align="center" style={{ marginBottom: 20, lineHeight: 18 }}>
        You can change your deposit method later in account settings
      </Typography>

      <Button onPress={handleContinue}>
        Select a Deposit Method
      </Button>
    </Container>
  );
};
