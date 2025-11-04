import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import {
  AvatarContainer,
  AvatarSection,
  ButtonContainer,
  Container,
  EditButton,
  InputRow,
  ScrollContent,
  Section,
  SectionTitle,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountDetails = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: user } = useGetUser();
  const updateUserMutation = useUpdateUser();

  const [nickName, setNickName] = useState('');

  // Initialize form values when user data loads
  useEffect(() => {
    if (user) {
      setNickName(user.nickname || '');
    }
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Account Details',
    });
  }, [navigation]);

  console.log('User data:', user);

  const handleChangePhoto = () => {
    // TODO: Implement photo picker
    console.log('Change photo');
  };

  const handleUpdate = async () => {
    try {
      await updateUserMutation.mutateAsync({
        nickname: nickName,
      });
      Alert.alert('Success', 'Account details updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update account details');
      console.error('Update error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Container>
        <ScrollContent>
          <AvatarSection>
            <AvatarContainer>
              <Avatar size={80} />
              <EditButton>
                <Button variant="circular" onPress={handleChangePhoto}>
                  <Icon name="✏️" size={16} />
                </Button>
              </EditButton>
            </AvatarContainer>
          </AvatarSection>

          <Section>
            <SectionTitle>Name</SectionTitle>
            <InputRow>
              <Input
                label="Nick Name"
                value={nickName}
                onChangeText={setNickName}
                placeholder="Enter nickname"
              />
            </InputRow>
            <InputRow>
              <Input
                label="First Name"
                value={user?.first_name || ''}
                editable={false}
                placeholder="First name"
              />
            </InputRow>
            <InputRow>
              <Input
                label="Last Name"
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
        </ScrollContent>
        <ButtonContainer>
          <Button
            variant="secondary"
            onPress={handleUpdate}
            disabled={updateUserMutation.isPending}
          >
            {updateUserMutation.isPending ? 'Updating...' : 'Update'}
          </Button>
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};
