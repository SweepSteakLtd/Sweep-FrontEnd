import React from 'react';
import {
  ButtonLabel,
  Container,
  DocumentIcon,
  DocumentPreview,
  IconText,
  Label,
  PickerButton,
  PickerContainer,
  PreviewContainer,
  PreviewFileInfo,
  PreviewFileName,
  PreviewFileSize,
  PreviewImage,
  PreviewOverlay,
  PreviewRemoveButton,
  PreviewRemoveText,
} from './styles';
import { formatFileSize, getFileIcon, PickedFile, useDocumentPicker } from './useDocumentPicker';

interface DocumentPickerProps {
  onFilePicked: (file: PickedFile | null) => void;
  /** Accepted file types for document picker (default: images and PDFs) */
  acceptedTypes?: string[];
  /** Maximum file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Label text above the picker */
  label?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
}

export const DocumentPicker: React.FC<DocumentPickerProps> = ({
  onFilePicked,
  acceptedTypes,
  maxSize,
  label,
  disabled = false,
}) => {
  const { selectedFile, isLoading, takePhoto, pickDocument, removeFile } = useDocumentPicker({
    acceptedTypes,
    maxSize,
    onFilePicked,
  });

  const handleTakePhoto = () => {
    if (disabled || isLoading) return;
    takePhoto();
  };

  const handlePickDocument = () => {
    if (disabled || isLoading) return;
    pickDocument();
  };

  const handleRemoveFile = () => {
    removeFile();
  };

  const isImage = selectedFile?.type?.startsWith('image/');

  return (
    <Container>
      {label && <Label variant="body">{label}</Label>}

      {!selectedFile ? (
        <PickerContainer>
          <PickerButton
            onPress={handleTakePhoto}
            $disabled={disabled || isLoading}
            disabled={disabled || isLoading}
          >
            <IconText>📷</IconText>
            <ButtonLabel variant="caption">Take Photo</ButtonLabel>
          </PickerButton>

          <PickerButton
            onPress={handlePickDocument}
            $disabled={disabled || isLoading}
            disabled={disabled || isLoading}
          >
            <IconText>📁</IconText>
            <ButtonLabel variant="caption">Choose File</ButtonLabel>
          </PickerButton>
        </PickerContainer>
      ) : (
        <PreviewContainer>
          {isImage ? (
            <PreviewImage source={{ uri: selectedFile.uri }} resizeMode="cover" />
          ) : (
            <DocumentPreview>
              <DocumentIcon>{getFileIcon(selectedFile.type)}</DocumentIcon>
            </DocumentPreview>
          )}
          <PreviewOverlay>
            <PreviewFileInfo>
              <PreviewFileName variant="caption" numberOfLines={1}>
                {selectedFile.name}
              </PreviewFileName>
              {selectedFile.size && (
                <PreviewFileSize variant="caption">
                  {formatFileSize(selectedFile.size)}
                </PreviewFileSize>
              )}
            </PreviewFileInfo>
            {!disabled && (
              <PreviewRemoveButton onPress={handleRemoveFile}>
                <PreviewRemoveText variant="caption">Remove</PreviewRemoveText>
              </PreviewRemoveButton>
            )}
          </PreviewOverlay>
        </PreviewContainer>
      )}
    </Container>
  );
};
