import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useCreateFirebaseAccount } from '~/features/auth/hooks/useCreateFirebaseAccount';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateAccount = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { createAccount, loading } = useCreateFirebaseAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = async () => {
    // Validation
    if (!email || !password) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    // Create Firebase account
    const success = await createAccount(email, password);

    if (success) {
      // Navigate to profile creation
      navigation.navigate('ProfileSetup');
    }
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
          Create Your Account
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.white}
          style={{ opacity: 0.8, marginTop: 5 }}
        >
          Join the social golf sweeps
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

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          disabled={loading}
          loading={loading}
          onPress={handleContinue}
          style={{ marginTop: 20 }}
        >
          Continue
        </Button>
      </FormContainer>

      <Button variant="link" onPress={() => navigation.goBack()} fullWidth={false}>
        {'< Back to Home'}
      </Button>
    </Container>
  );
};
