import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useCreateProfile } from '~/features/auth/hooks/useCreateProfile';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';
import { profileSetupSchema } from './validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  depositLimit?: string;
  bettingLimit?: string;
}

export const ProfileSetup = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [depositLimit, setDepositLimit] = useState('500');
  const [bettingLimit, setBettingLimit] = useState('100');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const { createProfile, loading } = useCreateProfile();

  const onSubmit = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(profileSetupSchema, {
      firstName,
      lastName,
      phoneNumber,
      bio,
      depositLimit,
      bettingLimit,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});

    // Create profile
    const success = await createProfile({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      bio: bio || undefined,
      deposit_limit: depositLimit ? parseInt(depositLimit, 10) : undefined,
      betting_limit: bettingLimit ? parseInt(bettingLimit, 10) : undefined,
    });

    if (success) {
      // Navigate to Dashboard after successful profile creation
      navigation.navigate('Dashboard');
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
          Complete Your Profile
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.white}
          style={{ opacity: 0.8, marginTop: 5 }}
        >
          Almost there! Tell us about yourself
        </Typography>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FormContainer>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (fieldErrors.firstName) {
                setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
              }
            }}
            placeholder="John"
            autoCapitalize="words"
            error={fieldErrors.firstName}
          />

          <Input
            label="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (fieldErrors.lastName) {
                setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
              }
            }}
            placeholder="Smith"
            autoCapitalize="words"
            error={fieldErrors.lastName}
          />

          <Input
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (fieldErrors.phoneNumber) {
                setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
              }
            }}
            placeholder="+1234567890"
            keyboardType="phone-pad"
            error={fieldErrors.phoneNumber}
          />

          <Input
            label="Bio (Optional)"
            value={bio}
            onChangeText={(text) => {
              setBio(text);
              if (fieldErrors.bio) {
                setFieldErrors((prev) => ({ ...prev, bio: undefined }));
              }
            }}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={3}
            error={fieldErrors.bio}
          />

          <Input
            label="Deposit Limit (Optional)"
            value={depositLimit}
            onChangeText={(text) => {
              setDepositLimit(text);
              if (fieldErrors.depositLimit) {
                setFieldErrors((prev) => ({ ...prev, depositLimit: undefined }));
              }
            }}
            placeholder="500"
            keyboardType="numeric"
            error={fieldErrors.depositLimit}
          />

          <Input
            label="Betting Limit (Optional)"
            value={bettingLimit}
            onChangeText={(text) => {
              setBettingLimit(text);
              if (fieldErrors.bettingLimit) {
                setFieldErrors((prev) => ({ ...prev, bettingLimit: undefined }));
              }
            }}
            placeholder="100"
            keyboardType="numeric"
            error={fieldErrors.bettingLimit}
          />

          <Button disabled={loading} loading={loading} onPress={onSubmit} style={{ marginTop: 20 }}>
            Create Account
          </Button>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};
