import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import type { RootStackParamList } from '~/navigation/types';
import { useChangePassword } from '../../hooks/useChangePassword';
import {
  ButtonContainer,
  Container,
  InputRow,
  ScrollContent,
  Section,
  SectionTitle,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Security = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { changePassword, loading, errors } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Security',
    });
  }, [navigation]);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={['bottom']}>
      <Container>
        <ScrollContent style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};
