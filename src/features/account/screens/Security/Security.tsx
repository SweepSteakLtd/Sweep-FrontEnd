import { useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { PasswordRequirements } from '~/components/PasswordRequirements/PasswordRequirements';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useChangePassword } from '../../hooks/useChangePassword';
import { ButtonContainer, Container, InputRow, Section, SectionTitle } from './styles';

export const Security = () => {
  const { changePassword, loading, errors } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = async () => {
    const result = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    // Clear form on success
    if (result.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <ScreenWrapper title="Security">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={140}
        >
          <Section>
            <SectionTitle>Password</SectionTitle>
            <InputRow>
              <Input
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                secureTextEntry
                autoCapitalize="none"
                error={errors.currentPassword}
              />
            </InputRow>
            <InputRow>
              <Input
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry
                autoCapitalize="none"
                error={errors.newPassword}
              />
              <PasswordRequirements password={newPassword} />
            </InputRow>
            <InputRow>
              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry
                autoCapitalize="none"
                error={errors.confirmPassword}
              />
            </InputRow>
          </Section>
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button variant="secondary" onPress={handleUpdate} loading={loading} title="Update" />
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
