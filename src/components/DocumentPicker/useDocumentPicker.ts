import * as DocumentPickerExpo from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export interface PickedFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface UseDocumentPickerOptions {
  /** Accepted file types for document picker (default: images and PDFs) */
  acceptedTypes?: string[];
  /** Maximum file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Callback when a file is picked */
  onFilePicked?: (file: PickedFile | null) => void;
}

const DEFAULT_ACCEPTED_TYPES = ['image/*', 'application/pdf'];
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB

export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getFileIcon = (type: string): string => {
  if (type.startsWith('image/')) return '🖼️';
  if (type === 'application/pdf') return '📄';
  return '📎';
};

export const useDocumentPicker = (options: UseDocumentPickerOptions = {}) => {
  const {
    acceptedTypes = DEFAULT_ACCEPTED_TYPES,
    maxSize = DEFAULT_MAX_SIZE,
    onFilePicked,
  } = options;

  const [selectedFile, setSelectedFile] = useState<PickedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilePicked = (file: PickedFile) => {
    if (file.size && file.size > maxSize) {
      Alert.alert('File too large', `Please select a file smaller than ${formatFileSize(maxSize)}`);
      return;
    }
    setSelectedFile(file);
    onFilePicked?.(file);
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos. Please enable it in your device settings.',
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const fileName = asset.uri.split('/').pop() || 'photo.jpg';
        handleFilePicked({
          uri: asset.uri,
          name: fileName,
          type: asset.mimeType || 'image/jpeg',
          size: asset.fileSize,
        });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      const errorMessage = error instanceof Error ? error.message : '';
      if (errorMessage.toLowerCase().includes('simulator')) {
        Alert.alert(
          'Camera Not Available',
          'Camera is not available on the simulator. Please use "Choose File" or test on a real device.',
        );
      } else {
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pickDocument = async () => {
    setIsLoading(true);
    try {
      const result = await DocumentPickerExpo.getDocumentAsync({
        type: acceptedTypes,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        handleFilePicked({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/octet-stream',
          size: asset.size,
        });
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFilePicked?.(null);
  };

  return {
    selectedFile,
    isLoading,
    takePhoto,
    pickDocument,
    removeFile,
    formatFileSize,
    getFileIcon,
  };
};
