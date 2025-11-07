import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useLogin } from '~/features/authentication/hooks/useLogin';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';
import { loginSchema } from './validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  email?: string;
  password?: string;
}

export const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState('karamvir.mangat@uvconsulting.net');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSignIn = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(loginSchema, {
      email,
      password,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});

    const loginResult = await login(email, password);

    if (loginResult.success) {
      if (loginResult.profileComplete) {
        // User has profile - go to Dashboard
        navigation.navigate('Dashboard');
      } else {
        // User needs to complete profile
        navigation.navigate('CreateProfile');
      }
    }
    // If failed, error is already shown by useLogin hook
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        bottomOffset={10}
      >
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
          <Typography variant="body" color={theme.colors.white} style={{ marginTop: 5 }}>
            Sign in to your account
          </Typography>
        </Header>

        <FormContainer>
          <Input
            variant="light"
            label="Email"
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
            variant="light"
            label="Password"
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
        </FormContainer>
      </KeyboardAwareScrollView>

      <KeyboardStickyView>
        <Button
          disabled={loading}
          loading={loading}
          onPress={handleSignIn}
          style={{ marginBottom: 10 }}
          title="Sign In"
        />

        <Button
          variant="link"
          onPress={() => navigation.navigate('CreateAccount')}
          fullWidth={false}
          title="Don't have an account? Create one"
        />
      </KeyboardStickyView>
    </Container>
  );
};
