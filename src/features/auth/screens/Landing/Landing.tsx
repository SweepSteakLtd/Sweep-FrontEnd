import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Typography } from '~/components/Typography/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { useTheme } from 'styled-components/native';
import {
  BadgeContainer,
  ButtonsContainer,
  Container,
  ContentContainer,
  ImageContainer,
  LogoCircle,
  LogoContainer,
  PlaceholderImage,
  PrizeContainer,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Landing = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <LogoContainer>
        <LogoCircle>
          <Icon name="⛳" size={20} />
        </LogoCircle>
        <Typography variant="heading" color={theme.colors.white}>
          Sweepsteak
        </Typography>
      </LogoContainer>

      <ContentContainer>
        <ImageContainer>
          <PlaceholderImage>
            <Typography variant="body" color={theme.colors.white}>
              Golf Scene Image
            </Typography>
          </PlaceholderImage>
        </ImageContainer>

        <PrizeContainer>
          <Typography variant="caption" color={theme.colors.text.secondary} align="center">
            Prize Payout to Date
          </Typography>
          <AnimatedAmount
            value={52300}
            variant="title"
            color={theme.colors.text.secondary}
            align="center"
            weight="bold"
          />
        </PrizeContainer>

        <BadgeContainer>
          <Typography
            variant="body"
            color={theme.colors.text.secondary}
            weight="600"
            align="center"
          >
            THE SOCIAL GOLF SWEEPS
          </Typography>
        </BadgeContainer>
      </ContentContainer>

      <ButtonsContainer>
        <Button variant="primary" onPress={() => navigation.navigate('TermsAndConditions', { nextScreen: 'CreateAccount' })}>
          Create account
        </Button>

        <Button variant="outline" onPress={() => navigation.navigate('TermsAndConditions', { nextScreen: 'Login' })}>
          Log In
        </Button>

        <Typography
          variant="caption"
          color={theme.colors.white}
          align="center"
          style={{ lineHeight: 16, marginTop: 20 }}
        >
          By continuing you agree to our{' '}
          <Typography variant="caption" color={theme.colors.white} style={{ textDecorationLine: 'underline' }}>
            Terms of Service
          </Typography>{' '}
          and{' '}
          <Typography variant="caption" color={theme.colors.white} style={{ textDecorationLine: 'underline' }}>
            Privacy Policy
          </Typography>
        </Typography>
      </ButtonsContainer>
    </Container>
  );
};
