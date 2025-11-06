import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useChangePassword } from '../../hooks/useChangePassword';
import {
  ButtonContainer,
  Container,
  InputRow,
  ScrollContent,
  Section,
  SectionTitle,
} from './styles';

export const Security = () => {
  const theme = useTheme();
  const { changePassword, loading, errors } = useChangePassword();
  const { refetch } = useGetUser();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
        <ScrollContent
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
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
        </ScrollContent>
        <ButtonContainer>
          <Button variant="secondary" onPress={handleUpdate} loading={loading}>
            Update
          </Button>
        </ButtonContainer>
      </Container>
    </ScreenWrapper>
  );
};
