import React from 'react';
import { ScrollView } from 'react-native';
import { DocumentPicker } from '~/components/DocumentPicker/DocumentPicker';
import { PickedFile } from '~/components/DocumentPicker/useDocumentPicker';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Container } from './styles';

export const TestUpload = () => {
  const handleFilePicked = (file: PickedFile | null) => {
    console.log('File picked:', file);
  };

  return (
    <ScreenWrapper title="Test Upload">
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DocumentPicker
            label="Upload a document or take a photo"
            onFilePicked={handleFilePicked}
          />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
