import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
<<<<<<< HEAD
=======
import { useTheme } from 'styled-components/native';
>>>>>>> update-chipin-branding
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { PasswordRequirements } from '~/components/PasswordRequirements/PasswordRequirements';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
<<<<<<< HEAD
import { useCreateFirebaseAccount } from '~/features/authentication/hooks/useCreateFirebaseAccount';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer } from './styles';
import { createAccountSchema } from './validation';

=======
import { Typography } from '~/components/Typography/Typography';
import { useCreateFirebaseAccount } from '~/features/authentication/hooks/useCreateFirebaseAccount';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer, Header, HeaderLogo, HeaderText, LogoContainer } from './styles';
import { createAccountSchema } from './validation';

const chipinLogo = require('../../../../../assets/Chipin1.png');

>>>>>>> update-chipin-branding
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const CreateAccount = () => {
<<<<<<< HEAD
=======
  const theme = useTheme();
>>>>>>> update-chipin-branding
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

    // Create the account directly (T&C already accepted before getting here)
    const success = await createAccount(email, password);
    if (success) {
      navigation.navigate('CreateProfile');
    }
  };

  return (
    <ScreenWrapper title="Create Account">
      <Container>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          bottomOffset={140}
        >
<<<<<<< HEAD
=======
          <Header>
            <HeaderText>
              <Typography variant="heading" color={theme.colors.text.primary}>
                Welcome to Chipin
              </Typography>
            </HeaderText>
            <LogoContainer>
              <HeaderLogo source={chipinLogo} resizeMode="contain" />
            </LogoContainer>
          </Header>

>>>>>>> update-chipin-branding
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
            <PasswordRequirements password={password} />

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
          </FormContainer>
        </KeyboardAwareScrollView>

        <KeyboardStickyView>
          <Button disabled={loading} loading={loading} onPress={handleContinue} title="Continue" />
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
