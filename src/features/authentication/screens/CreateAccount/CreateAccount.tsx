import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useLayoutEffect, useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { useCreateFirebaseAccount } from '~/features/authentication/hooks/useCreateFirebaseAccount';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList, RootStackScreenProps } from '~/navigation/types';
import { Container, FormContainer } from './styles';
import { createAccountSchema } from './validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RootStackScreenProps<'CreateAccount'>['route'];

interface FieldErrors extends Record<string, string | undefined> {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const CreateAccount = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { createAccount, loading } = useCreateFirebaseAccount();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Configure navigation header with back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Account',
    });
  }, [navigation]);

  // If coming back from T&C with credentials, create the account automatically
  useEffect(() => {
    const createAccountFromTnC = async () => {
      if (route.params?.email && route.params?.password) {
        const success = await createAccount(route.params.email, route.params.password);
        if (success) {
          navigation.navigate('CreateProfile');
        }
      }
    };
    createAccountFromTnC();
  }, [route.params]);

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

    // Navigate to T&C screen, passing the credentials
    // After user accepts T&C, they will create the account
    navigation.navigate('TermsAndConditions', {
      nextScreen: 'CreateAccount',
      email,
      password,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['bottom']}>
      <Container>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          bottomOffset={10}
        >
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
          </FormContainer>
        </KeyboardAwareScrollView>

        <KeyboardStickyView>
          <Button disabled={loading} loading={loading} onPress={handleContinue} title="Continue" />
        </KeyboardStickyView>
      </Container>
    </SafeAreaView>
  );
};
