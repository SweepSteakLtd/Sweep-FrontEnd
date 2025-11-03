import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import type { RootStackParamList } from '~/navigation/types';
import { Container, InputRow, ScrollContent, Section, SectionTitle } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Security = () => {
  const navigation = useNavigation<NavigationProp>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Security',
    });
  }, [navigation]);

  const handleUpdate = () => {
    // TODO: Implement password update
    console.log('Update password');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Container>
        <ScrollContent>
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
              />
            </InputRow>
            <InputRow>
              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter new password"
                secureTextEntry
                autoCapitalize="none"
              />
            </InputRow>
            <Button variant="secondary" onPress={handleUpdate}>
              Update
            </Button>
          </Section>
        </ScrollContent>
      </Container>
    </SafeAreaView>
  );
};
