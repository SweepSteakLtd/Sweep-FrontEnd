import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useLogin } from '~/features/auth/hooks/useLogin';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState('karamvir.mangat@uvconsulting.net');
  const [password, setPassword] = useState('Hello123');

  const handleSignIn = async () => {
    const result = await login(email, password);

    if (result.success) {
      if (result.profileComplete) {
        // User has profile - go to Dashboard
        navigation.navigate('Dashboard');
      } else {
        // User needs to complete profile
        navigation.navigate('ProfileSetup');
      }
    }
    // If failed, error is already shown by useLogin hook
  };

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

      <Header>
        <Typography variant="heading" color={theme.colors.white}>
          Welcome to SweepSteak
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.white}
          style={{ opacity: 0.8, marginTop: 5 }}
        >
          Sign in to your account
        </Typography>
      </Header>

      <FormContainer>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          disabled={loading}
          loading={loading}
          onPress={handleSignIn}
          style={{ marginTop: 20 }}
        >
          Sign In
        </Button>
      </FormContainer>

      <Button variant="link" onPress={() => navigation.goBack()} fullWidth={false}>
        {'< Back to Home'}
      </Button>
    </Container>
  );
};
