import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useForgotPassword } from '~/features/authentication/hooks/useForgotPassword';
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
import { forgotPasswordSchema } from './validation';

const chipinLogo = require('../../../../../assets/ChipInLogo.jpg');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  email?: string;
}

export const ForgotPassword = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { resetPassword, loading } = useForgotPassword();

  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleResetPassword = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(forgotPasswordSchema, {
      email,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});

    const success = await resetPassword(email);
    if (success) {
      navigation.navigate('Login');
    }
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
              variant="heading"
              color={theme.colors.text.primary}
              style={{ marginBottom: 10 }}
            >
              Forgot Password?
            </Typography>

            <Typography
              variant="body"
              color={theme.colors.text.tertiary}
              style={{ marginBottom: 20 }}
            >
              Enter your email address and we'll send you a link to reset your password.
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

            <Button
              disabled={loading}
              loading={loading}
              onPress={handleResetPassword}
              style={{ marginTop: 16, marginBottom: 10 }}
              title="Send Reset Link"
            />

            <Button
              variant="link"
              onPress={() => navigation.navigate('Login')}
              fullWidth={false}
              title="Back to Login"
            />
          </FormContainer>
        </ContentWrapper>

        <ComplianceFooter />
      </KeyboardAwareScrollView>
    </Container>
  );
};
