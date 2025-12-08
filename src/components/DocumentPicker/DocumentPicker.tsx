import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ImageGalleryModal } from './ImageGalleryModal';
import {
  Container,
  DocumentIcon,
  DocumentPreview,
  IconText,
  ImageCountText,
  ImagesGrid,
  ImageThumbnail,
  ImageThumbnailContainer,
  Label,
  PickerButton,
  PickerButtonsRow,
  PickerContainer,
  PickerHelpText,
  PickerHelpTextBold,
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

  const handleTakePhoto = () => {
    if (disabled || isLoading) return;
    takePhoto();
  };

  const handlePickFromGallery = () => {
    if (disabled || isLoading) return;
    pickFromGallery();
  };

  const handlePickDocument = () => {
    if (disabled || isLoading) return;
    pickDocument();
  };

  const handleRemoveFile = (index?: number) => {
    if (disabled) return;
    removeFile(index);
  };

  // Multiple mode - grid view
  if (multiple) {
    const canAddMore = selectedFiles.length < (maxFiles ?? 10);
    const hasImages = selectedFiles.length > 0;

    return (
      <Container>
        {label && <Label variant="body">{label}</Label>}

        {!hasImages ? (
          <PickerContainer>
            <PickerButtonsRow>
              <PickerButton
                onPress={handleTakePhoto}
                $disabled={disabled || isLoading}
                disabled={disabled || isLoading}
              >
                <IconText>📷</IconText>
              </PickerButton>

              <PickerButton
                onPress={handlePickFromGallery}
                $disabled={disabled || isLoading}
                disabled={disabled || isLoading}
              >
                <IconText>🖼️</IconText>
              </PickerButton>

              <PickerButton
                onPress={handlePickDocument}
                $disabled={disabled || isLoading}
                disabled={disabled || isLoading}
              >
                <IconText>📁</IconText>
              </PickerButton>
            </PickerButtonsRow>
            <PickerHelpText>
              Take a photo or upload from gallery or files{'\n'}
              <PickerHelpTextBold>JPEG, PNG</PickerHelpTextBold> supported{'\n'}
              Max <PickerHelpTextBold>10MB</PickerHelpTextBold> per file
            </PickerHelpText>
          </PickerContainer>
        ) : (
          <>
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
            </ImagesGrid>

            <ImageCountText>
              {selectedFiles.length} of {maxFiles} images
            </ImageCountText>

            {canAddMore && !disabled && (
              <PickerContainer style={{ marginTop: 12 }}>
                <PickerButtonsRow>
                  <PickerButton
                    onPress={handleTakePhoto}
                    $disabled={disabled || isLoading}
                    disabled={disabled || isLoading}
                  >
                    <IconText>📷</IconText>
                  </PickerButton>

                  <PickerButton
                    onPress={handlePickFromGallery}
                    $disabled={disabled || isLoading}
                    disabled={disabled || isLoading}
                  >
                    <IconText>🖼️</IconText>
                  </PickerButton>

                  <PickerButton
                    onPress={handlePickDocument}
                    $disabled={disabled || isLoading}
                    disabled={disabled || isLoading}
                  >
                    <IconText>📁</IconText>
                  </PickerButton>
                </PickerButtonsRow>
                <PickerHelpText>
                  Take a photo or upload from gallery or files{'\n'}
                  <PickerHelpTextBold>JPEG, PNG</PickerHelpTextBold> supported{'\n'}
                  Max <PickerHelpTextBold>10MB</PickerHelpTextBold> per file
                </PickerHelpText>
              </PickerContainer>
            )}

            <ImageGalleryModal
              visible={galleryVisible}
              images={selectedFiles}
              initialIndex={galleryInitialIndex}
              onClose={() => setGalleryVisible(false)}
              onDelete={disabled ? undefined : handleRemoveFile}
            />
          </>
        )}
      </Container>
    );
  }

  // Single mode - original behavior
  const isImage = selectedFile?.type?.startsWith('image/');

  return (
    <Container>
      {label && <Label variant="body">{label}</Label>}

      {!selectedFile ? (
        <PickerContainer>
          <PickerButtonsRow>
            <PickerButton
              onPress={handleTakePhoto}
              $disabled={disabled || isLoading}
              disabled={disabled || isLoading}
            >
              <IconText>📷</IconText>
            </PickerButton>

            <PickerButton
              onPress={handlePickFromGallery}
              $disabled={disabled || isLoading}
              disabled={disabled || isLoading}
            >
              <IconText>🖼️</IconText>
            </PickerButton>

            <PickerButton
              onPress={handlePickDocument}
              $disabled={disabled || isLoading}
              disabled={disabled || isLoading}
            >
              <IconText>📁</IconText>
            </PickerButton>
          </PickerButtonsRow>
          <PickerHelpText>
            Take a photo or upload from gallery or files{'\n'}
            <PickerHelpTextBold>JPEG, PNG</PickerHelpTextBold> supported{'\n'}
            Max <PickerHelpTextBold>10MB</PickerHelpTextBold> per file
          </PickerHelpText>
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
              <PreviewRemoveButton onPress={() => handleRemoveFile()}>
                <PreviewRemoveText variant="caption">Remove</PreviewRemoveText>
              </PreviewRemoveButton>
            )}
          </PreviewOverlay>
        </PreviewContainer>
      )}
    </Container>
  );
};
