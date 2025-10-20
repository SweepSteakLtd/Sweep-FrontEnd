import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { useAlert } from '~/components/Alert/Alert';
import { useCreateProfile } from '~/features/auth/hooks/useCreateProfile';
import { useTheme } from 'styled-components/native';
import { Container, FormContainer, Header, LogoCircle, LogoContainer } from './styles';

export const ProfileSetup = () => {
  const theme = useTheme();
  const { showAlert } = useAlert();

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [depositLimit, setDepositLimit] = useState('500');
  const [bettingLimit, setBettingLimit] = useState('100');

  const { createProfile, loading } = useCreateProfile();

  const onSubmit = async () => {
    // Validation
    if (!firstName || !lastName || !phoneNumber) {
      showAlert({
        title: 'Missing Information',
        message: 'Please fill in all required fields',
      });
      return;
    }

    // Create profile
    await createProfile({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      bio: bio || undefined,
      deposit_limit: depositLimit ? parseInt(depositLimit, 10) : undefined,
      betting_limit: bettingLimit ? parseInt(bettingLimit, 10) : undefined,
    });
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
        <Typography variant="body" color={theme.colors.white} style={{ opacity: 0.8, marginTop: 5 }}>
          Almost there! Tell us about yourself
        </Typography>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FormContainer>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="John"
            autoCapitalize="words"
          />

          <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Smith"
            autoCapitalize="words"
          />

          <Input
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+1234567890"
            keyboardType="phone-pad"
          />

          <Input
            label="Bio (Optional)"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={3}
          />

          <Input
            label="Deposit Limit (Optional)"
            value={depositLimit}
            onChangeText={setDepositLimit}
            placeholder="500"
            keyboardType="numeric"
          />

          <Input
            label="Betting Limit (Optional)"
            value={bettingLimit}
            onChangeText={setBettingLimit}
            placeholder="100"
            keyboardType="numeric"
          />

          <Button disabled={loading} loading={loading} onPress={onSubmit} style={{ marginTop: 20 }}>
            Create Account
          </Button>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};
