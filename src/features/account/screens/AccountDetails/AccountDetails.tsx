import { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Avatar } from '~/components/Avatar/Avatar';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useDeleteUser } from '~/services/apis/User/useDeleteUser';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import {
  AvatarContainer,
  AvatarSection,
  ButtonContainer,
  Container,
  EditButton,
  InputRow,
  Section,
  SectionTitle,
} from './styles';

export const AccountDetails = () => {
  const theme = useTheme();
  const { showAlert } = useAlert();
  const { data: user, refetch } = useGetUser();
  const updateUserMutation = useUpdateUser();
  const { isPending: isDeleting, handleDeleteAccount } = useDeleteUser();

  const [nickName, setNickName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Initialize form values when user data loads
  useEffect(() => {
    if (user) {
      setNickName(user.nickname || '');
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleChangePhoto = () => {
    // TODO: Implement photo picker
    console.log('Change photo');
  };

  const handleUpdate = async () => {
    try {
      await updateUserMutation.mutateAsync({
        nickname: nickName,
      });
      showAlert({
        title: 'Success',
        message: 'Account details updated successfully',
      });
    } catch (error) {
      showAlert({
        title: 'Error',
        message: 'Failed to update account details',
      });
      console.error('Update error:', error);
    }
  };

  return (
    <ScreenWrapper title="Account Details">
      <Container
        style={{ opacity: isDeleting ? 0.5 : 1, pointerEvents: isDeleting ? 'none' : 'auto' }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={140}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          <AvatarSection>
            <AvatarContainer>
              <Avatar size={80} />
              <EditButton>
                <Button icon={<Icon name="✏️" size={16} />} onPress={handleChangePhoto} />
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
              <Input
                label="Address"
                value={
                  user?.address
                    ? [
                        user.address.line1,
                        user.address.line2,
                        user.address.line3,
                        user.address.town,
                        user.address.county,
                        user.address.postcode,
                      ]
                        .filter(Boolean)
                        .join('\n')
                    : ''
                }
                editable={false}
                multiline
                numberOfLines={6}
                placeholder="Address"
              />
            </InputRow>
          </Section>

          {/* Delete Account Button - without card styling */}
          <InputRow style={{ marginTop: 32, paddingHorizontal: 16 }}>
            <Button
              variant="secondary"
              onPress={handleDeleteAccount}
              disabled={isDeleting}
              loading={isDeleting}
              title="Delete Account"
              backgroundColor={theme.colors.error}
              style={{
                borderColor: theme.colors.error,
              }}
            />
          </InputRow>
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button
              variant="secondary"
              onPress={handleUpdate}
              disabled={updateUserMutation.isPending}
              title={updateUserMutation.isPending ? 'Updating...' : 'Update'}
            />
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
