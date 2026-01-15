import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { DevMockButton } from '~/components/DevMockButton/DevMockButton';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useLogin } from '~/features/authentication/hooks/useLogin';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import {
  Container,
  ContentWrapper,
  FormContainer,
  Header,
  HeaderLogo,
  LogoContainer,
} from './styles';
import { loginSchema } from './validation';

const chipinLogo = require('../../../../../assets/ChipInLogo.jpg');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  email?: string;
  password?: string;
}

export const Login = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState('marin.obranovic@gmail.com');
  const [password, setPassword] = useState('Dude1234#');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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
        // User has profile - check if verified
        if (!loginResult.isVerified) {
          // User is not verified - show verification pending screen
          navigation.navigate('VerificationPending');
        } else {
          // User is verified - show T&C first, then go to Dashboard
          navigation.navigate('TermsAndConditions', {
            nextScreen: 'Dashboard',
          });
        }
      } else {
        // User needs to complete profile - show T&C first
        navigation.navigate('TermsAndConditions', {
          nextScreen: 'CreateProfile',
        });
      }
    }
    // If failed, error is already shown by useLogin hook
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        bottomOffset={220}
      >
        <ContentWrapper>
          <Header>
            <LogoContainer>
              <HeaderLogo source={chipinLogo} resizeMode="contain" />
            </LogoContainer>
          </Header>

          <FormContainer>
            <Typography
              variant="body"
              color={theme.colors.text.tertiary}
              style={{ marginBottom: 10 }}
            >
              Sign in to your account
            </Typography>

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

            <Button
              variant="link"
              onPress={() => navigation.navigate('ForgotPassword')}
              fullWidth={false}
              title="Forgot Password?"
              style={{ alignSelf: 'flex-end', marginTop: -8 }}
            />

            <Button
              disabled={loading}
              loading={loading}
              onPress={handleSignIn}
              style={{ marginTop: 16, marginBottom: 10 }}
              title="Sign In"
            />

            <Button
              variant="link"
              onPress={() =>
                navigation.navigate('TermsAndConditions', {
                  nextScreen: 'CreateAccount',
                })
              }
              fullWidth={false}
              title="Don't have an account? Create one"
            />

            <DevMockButton position="inline" />
          </FormContainer>
        </ContentWrapper>

        <ComplianceFooter />
      </KeyboardAwareScrollView>
    </Container>
  );
};
