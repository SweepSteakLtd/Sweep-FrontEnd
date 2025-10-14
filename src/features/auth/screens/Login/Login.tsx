import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';
import { Typography } from '~/components/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { useTheme } from '~/theme/ThemeProvider';
import { useLogin } from '~/features/auth/hooks/useLogin';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { loading, signIn } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn(email, password);
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
        <Typography variant="body" color={theme.colors.white} style={{ opacity: 0.8, marginTop: 5 }}>
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

        <Button disabled={loading} loading={loading} onPress={handleSignIn} style={{ marginTop: 20 }}>
          Sign In
        </Button>
      </FormContainer>

      <Button variant="link" onPress={() => navigation.goBack()} fullWidth={false}>
        {'< Back to Home'}
      </Button>
    </Container>
  );
};
