import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useCreateFirebaseAccount } from '~/features/authentication/hooks/useCreateFirebaseAccount';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';
import { createAccountSchema } from './validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const CreateAccount = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { createAccount, loading } = useCreateFirebaseAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleContinue = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(createAccountSchema, {
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});

    // Create Firebase account
    const success = await createAccount(email, password);

    if (success) {
      // Navigate to account setup
      navigation.navigate('CreateProfile');
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
          variant="light"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
          error={fieldErrors.email}
        />

        <Input
          label="Password"
          variant="light"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          error={fieldErrors.password}
        />

        <Input
          label="Confirm Password"
          variant="light"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
          }}
          placeholder="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
          error={fieldErrors.confirmPassword}
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
