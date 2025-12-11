import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/Button/Button';
import { DocumentPicker } from '~/components/DocumentPicker/DocumentPicker';
import type { PickedFile } from '~/components/DocumentPicker/useDocumentPicker';
import type { RootStackParamList } from '~/navigation/types';
import { toJpegDataUri, useUploadGBGDocuments } from '~/services/apis/User/useUploadGBGDocuments';
import {
  ButtonSection,
  Container,
  Content,
  ErrorText,
  HeaderSection,
  PickerSection,
  RequirementIcon,
  RequirementItem,
  RequirementsList,
  RequirementText,
  Subtitle,
  Title,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MAX_DOCUMENTS = 10;

export const DocumentUpload: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [documents, setDocuments] = useState<PickedFile[]>([]);
  const [showError, setShowError] = useState(false);
  const uploadMutation = useUploadGBGDocuments();

  const handleFilesChanged = (files: PickedFile[]) => {
    setDocuments(files);
  };

  const handleSubmit = async () => {
    if (documents.length === 0) {
      Alert.alert('No Documents', 'Please select at least one document to upload.');
      return;
    }

    // Check that all documents have base64 data
    const missingBase64 = documents.some((doc) => !doc.base64);
    if (missingBase64) {
      Alert.alert('Error', 'Some documents could not be processed. Please try again.');
      return;
    }

    // Clear error before new upload
    setShowError(false);

    try {
      // Convert base64 strings to data URI format
      const formattedDocuments = documents.map((doc) => toJpegDataUri(doc.base64!));

      await uploadMutation.mutateAsync({
        documents: formattedDocuments,
      });

      // Navigate directly to verification pending screen with flag to show document review copy
      navigation.navigate('VerificationPending', { fromDocumentUpload: true });
    } catch (error) {
      // Show error after request fails
      setShowError(true);
    }
  };

  const isSubmitting = uploadMutation.isPending;
  const hasDocuments = documents.length > 0;

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <Content>
            <HeaderSection>
              <Title>Upload Identity Documents</Title>
              <Subtitle>
                Please upload clear photos of your identity documents. This helps us verify your
                identity and comply with regulations.
              </Subtitle>

              <RequirementsList>
                <RequirementItem>
                  <RequirementIcon>📷</RequirementIcon>
                  <RequirementText>Take photos or select from your gallery</RequirementText>
                </RequirementItem>
                <RequirementItem>
                  <RequirementIcon>📄</RequirementIcon>
                  <RequirementText>
                    Accepted: Passport, Driver's License, National ID
                  </RequirementText>
                </RequirementItem>
                <RequirementItem>
                  <RequirementIcon>✓</RequirementIcon>
                  <RequirementText>Ensure all details are clearly visible</RequirementText>
                </RequirementItem>
                <RequirementItem>
                  <RequirementIcon>📏</RequirementIcon>
                  <RequirementText>Maximum 10MB per document</RequirementText>
                </RequirementItem>
              </RequirementsList>
            </HeaderSection>

            <PickerSection>
              <DocumentPicker
                multiple
                includeBase64
                maxFiles={MAX_DOCUMENTS}
                onFilesChanged={handleFilesChanged}
                disabled={isSubmitting}
                label="Identity Documents"
              />
            </PickerSection>
          </Content>
        </ScrollView>

        <ButtonSection>
          {showError && (
            <ErrorText>
              There seems to be an issue with your verification. Please contact support.
            </ErrorText>
          )}
          <Button
            title={isSubmitting ? 'Uploading...' : 'Submit Documents'}
            onPress={handleSubmit}
            disabled={!hasDocuments || isSubmitting}
            loading={isSubmitting}
          />
          <Button
            variant="link"
            title="Back to Login"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            }
            disabled={isSubmitting}
            style={{ marginTop: 8 }}
          />
        </ButtonSection>
      </SafeAreaView>
    </Container>
  );
};
