import { useEffect, useState } from 'react';
import { Image, Modal, RefreshControl, StyleSheet, View } from 'react-native';
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
import { useUploadProfilePhoto } from '../../hooks/useUploadProfilePhoto';
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
  const {
    pickFromGallery,
    confirmUpload,
    cancelUpload,
    previewUri,
    isLoading: isUploadingPhoto,
    isUploading,
  } = useUploadProfilePhoto();

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
    if (isUploadingPhoto) return;
    pickFromGallery();
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
                <Button
                  icon={<Icon name={isUploadingPhoto ? '⏳' : '✏️'} size={16} />}
                  onPress={handleChangePhoto}
                  disabled={isUploadingPhoto}
                />
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

      <Modal visible={!!previewUri} transparent animationType="fade" onRequestClose={cancelUpload}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {previewUri && (
              <Image source={{ uri: previewUri }} style={styles.previewImage} resizeMode="cover" />
            )}
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="secondary"
                onPress={cancelUpload}
                disabled={isUploading}
                style={{ flex: 1 }}
              />
              <Button
                title="Re-select"
                variant="secondary"
                onPress={() => {
                  cancelUpload();
                  setTimeout(pickFromGallery, 100);
                }}
                disabled={isUploading}
                style={{ flex: 1 }}
              />
              <Button
                title={isUploading ? 'Uploading...' : 'Confirm'}
                variant="secondary"
                onPress={confirmUpload}
                disabled={isUploading}
                loading={isUploading}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});
