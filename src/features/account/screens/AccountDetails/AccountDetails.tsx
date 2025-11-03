import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '~/components/Avatar/Avatar';
import { Input } from '~/components/Input/Input';
import { Switch } from '~/components/Switch/Switch';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';
import {
  AvatarSection,
  ChangePhotoButton,
  ChangePhotoText,
  Container,
  DeleteButton,
  DeleteButtonText,
  InputRow,
  ScrollContent,
  Section,
  SectionTitle,
  ToggleLabel,
  ToggleRow,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountDetails = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: user } = useGetUser();

  const [nickName, setNickName] = useState('');
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Account details',
    });
  }, [navigation]);

  console.log('User data:', user);

  const handleChangePhoto = () => {
    // TODO: Implement photo picker
    console.log('Change photo');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account
    console.log('Delete account');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Container>
        <ScrollContent>
          <AvatarSection>
            <Avatar size={80} />
            <ChangePhotoButton onPress={handleChangePhoto}>
              <ChangePhotoText>change profile photo</ChangePhotoText>
            </ChangePhotoButton>
          </AvatarSection>

          <Section>
            <SectionTitle>Name</SectionTitle>
            <InputRow>
              <Input
                label="NickName"
                value={nickName}
                onChangeText={setNickName}
                placeholder="Enter nickname"
              />
            </InputRow>
            <InputRow>
              <Input
                label="FirstName"
                value={user?.first_name || ''}
                editable={false}
                placeholder="First name"
              />
            </InputRow>
            <InputRow>
              <Input
                label="LastName"
                value={user?.last_name || ''}
                editable={false}
                placeholder="Last name"
              />
            </InputRow>
          </Section>

          <Section>
            <SectionTitle>Contact Details</SectionTitle>
            <InputRow>
              <Input
                label="Phone Number"
                value={user?.phone_number || ''}
                editable={false}
                placeholder="Phone number"
              />
            </InputRow>
            <InputRow>
              <Input
                label="Email Address"
                value={user?.email || ''}
                editable={false}
                placeholder="Email"
              />
            </InputRow>
          </Section>

          <Section>
            <SectionTitle>Residential Address</SectionTitle>
            <InputRow>
              <Input label="Address" value="" editable={false} placeholder="Address" />
            </InputRow>
          </Section>

          <Section>
            <SectionTitle>Marketing preferences</SectionTitle>
            <ToggleRow>
              <ToggleLabel>Email</ToggleLabel>
              <Switch value={emailMarketing} onValueChange={setEmailMarketing} />
            </ToggleRow>
            <ToggleRow>
              <ToggleLabel>Notifications</ToggleLabel>
              <Switch value={notifications} onValueChange={setNotifications} />
            </ToggleRow>
          </Section>

          <DeleteButton onPress={handleDeleteAccount}>
            <DeleteButtonText>Delete account</DeleteButtonText>
          </DeleteButton>
        </ScrollContent>
      </Container>
    </SafeAreaView>
  );
};
