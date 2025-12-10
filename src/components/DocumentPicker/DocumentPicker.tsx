import React, { useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { ImageGalleryModal } from './ImageGalleryModal';
import {
  AddMoreButton,
  AddMoreIcon,
  AddMoreLabel,
  Container,
  DocumentIcon,
  DocumentPreview,
  ImageCountText,
  ImagesGrid,
  ImageThumbnail,
  ImageThumbnailContainer,
  Label,
  OptionButton,
  OptionIcon,
  OptionsContainer,
  OptionsTitle,
  OptionText,
  PreviewContainer,
  PreviewFileInfo,
  PreviewFileName,
  PreviewFileSize,
  PreviewImage,
  PreviewOverlay,
  PreviewRemoveButton,
  PreviewRemoveText,
  ThumbnailRemoveButton,
  ThumbnailRemoveText,
  ThumbnailSizeLabel,
  ThumbnailSizeText,
} from './styles';
import { formatFileSize, getFileIcon, PickedFile, useDocumentPicker } from './useDocumentPicker';

interface BaseDocumentPickerProps {
  /** Accepted file types for document picker (default: images only in multi mode, images and PDFs in single mode) */
  acceptedTypes?: string[];
  /** Maximum file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Label text above the picker */
  label?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Include BASE64 encoding of files */
  includeBase64?: boolean;
}

interface SingleModeProps extends BaseDocumentPickerProps {
  /** Enable multiple file selection */
  multiple?: false;
  /** Callback when a file is picked (single mode) */
  onFilePicked: (file: PickedFile | null) => void;
  onFilesChanged?: never;
  maxFiles?: never;
}

interface MultipleModeProps extends BaseDocumentPickerProps {
  /** Enable multiple file selection */
  multiple: true;
  /** Callback when files change (multiple mode) */
  onFilesChanged: (files: PickedFile[]) => void;
  /** Maximum number of files (multiple mode only, default: 10) */
  maxFiles?: number;
  onFilePicked?: never;
}

type DocumentPickerProps = SingleModeProps | MultipleModeProps;

/**
 * Document/Image picker component
 * Supports camera, gallery selection, and file picker
 * Use `multiple={true}` for multi-image selection with grid view
 */
export const DocumentPicker: React.FC<DocumentPickerProps> = (props) => {
  const {
    acceptedTypes,
    maxSize,
    label,
    disabled = false,
    includeBase64 = false,
    multiple = true,
  } = props;

  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [optionsVisible, setOptionsVisible] = useState(false);

  // Determine callbacks based on mode
  const onFilePicked = multiple ? undefined : (props as SingleModeProps).onFilePicked;
  const onFilesChanged = multiple ? (props as MultipleModeProps).onFilesChanged : undefined;
  const maxFiles = multiple ? ((props as MultipleModeProps).maxFiles ?? 10) : undefined;

  // Default to images only in multi mode
  const finalAcceptedTypes =
    acceptedTypes ?? (multiple ? ['image/*'] : ['image/*', 'application/pdf']);

  const {
    selectedFile,
    selectedFiles,
    isLoading,
    takePhoto,
    pickFromGallery,
    pickDocument,
    removeFile,
  } = useDocumentPicker({
    acceptedTypes: finalAcceptedTypes,
    maxSize,
    onFilePicked,
    multiple,
    onFilesChanged,
    maxFiles,
    includeBase64,
  });

  const openOptionsSheet = () => {
    if (disabled || isLoading) return;
    setOptionsVisible(true);
  };

  const closeOptionsSheet = () => {
    setOptionsVisible(false);
  };

  const handleTakePhoto = () => {
    closeOptionsSheet();
    setTimeout(() => takePhoto(), 100);
  };

  const handlePickFromGallery = () => {
    closeOptionsSheet();
    setTimeout(() => pickFromGallery(), 100);
  };

  const handlePickDocument = () => {
    closeOptionsSheet();
    setTimeout(() => pickDocument(), 100);
  };

  const handleRemoveFile = (index?: number) => {
    if (disabled) return;
    removeFile(index);
  };

  const renderOptionsSheet = () => (
    <Modal
      visible={optionsVisible}
      transparent
      animationType="slide"
      onRequestClose={closeOptionsSheet}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
        onPress={closeOptionsSheet}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <OptionsContainer>
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#ccc',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 16,
              }}
            />
            <OptionsTitle>Add Document</OptionsTitle>
            <OptionButton onPress={handleTakePhoto} activeOpacity={0.7}>
              <OptionIcon>📷</OptionIcon>
              <OptionText>Take Photo</OptionText>
            </OptionButton>
            <OptionButton onPress={handlePickFromGallery} activeOpacity={0.7}>
              <OptionIcon>🖼️</OptionIcon>
              <OptionText>Choose from Gallery</OptionText>
            </OptionButton>
            <OptionButton onPress={handlePickDocument} activeOpacity={0.7}>
              <OptionIcon>📁</OptionIcon>
              <OptionText>Choose File</OptionText>
            </OptionButton>
          </OptionsContainer>
        </Pressable>
      </Pressable>
    </Modal>
  );

  // Multiple mode - grid view
  if (multiple) {
    const canAddMore = selectedFiles.length < (maxFiles ?? 10);
    const hasImages = selectedFiles.length > 0;

    return (
      <Container>
        {label && <Label variant="body">{label}</Label>}

        <ImagesGrid>
          {selectedFiles.map((file, index) => (
            <TouchableOpacity
              key={`${file.uri}-${index}`}
              onPress={() => {
                setGalleryInitialIndex(index);
                setGalleryVisible(true);
              }}
              activeOpacity={0.8}
            >
              <ImageThumbnailContainer>
                <ImageThumbnail source={{ uri: file.uri }} resizeMode="cover" />
                {file.size && (
                  <ThumbnailSizeLabel>
                    <ThumbnailSizeText>{formatFileSize(file.size)}</ThumbnailSizeText>
                  </ThumbnailSizeLabel>
                )}
                {!disabled && (
                  <ThumbnailRemoveButton
                    onPress={() => handleRemoveFile(index)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <ThumbnailRemoveText>✕</ThumbnailRemoveText>
                  </ThumbnailRemoveButton>
                )}
              </ImageThumbnailContainer>
            </TouchableOpacity>
          ))}

          {canAddMore && !disabled && (
            <AddMoreButton onPress={openOptionsSheet} $disabled={isLoading} activeOpacity={0.7}>
              <AddMoreIcon>+</AddMoreIcon>
              <AddMoreLabel>Add</AddMoreLabel>
            </AddMoreButton>
          )}
        </ImagesGrid>

        {hasImages && (
          <ImageCountText>
            {selectedFiles.length} of {maxFiles} images
          </ImageCountText>
        )}

        <ImageGalleryModal
          visible={galleryVisible}
          images={selectedFiles}
          initialIndex={galleryInitialIndex}
          onClose={() => setGalleryVisible(false)}
          onDelete={disabled ? undefined : handleRemoveFile}
        />

        {renderOptionsSheet()}
      </Container>
    );
  }

  // Single mode
  const isImage = selectedFile?.type?.startsWith('image/');

  return (
    <Container>
      {label && <Label variant="body">{label}</Label>}

      {!selectedFile ? (
        <AddMoreButton
          onPress={openOptionsSheet}
          $disabled={disabled || isLoading}
          activeOpacity={0.7}
        >
          <AddMoreIcon>+</AddMoreIcon>
          <AddMoreLabel>Add</AddMoreLabel>
        </AddMoreButton>
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
              <PreviewRemoveButton onPress={() => handleRemoveFile()}>
                <PreviewRemoveText variant="caption">Remove</PreviewRemoveText>
              </PreviewRemoveButton>
            )}
          </PreviewOverlay>
        </PreviewContainer>
      )}

      {renderOptionsSheet()}
    </Container>
  );
};
