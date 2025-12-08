import * as DocumentPickerExpo from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export interface PickedFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
  base64?: string;
}

interface UseDocumentPickerOptions {
  /** Accepted file types for document picker (default: images and PDFs) */
  acceptedTypes?: string[];
  /** Maximum file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Callback when a file is picked (single file mode) */
  onFilePicked?: (file: PickedFile | null) => void;
  /** Enable multiple file selection */
  multiple?: boolean;
  /** Callback when files change (multiple file mode) */
  onFilesChanged?: (files: PickedFile[]) => void;
  /** Maximum number of files (multiple mode only) */
  maxFiles?: number;
  /** Include BASE64 encoding of files */
  includeBase64?: boolean;
}

const DEFAULT_ACCEPTED_TYPES = ['image/*', 'application/pdf'];
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_MAX_FILES = 10;

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

/** Convert a file URI to BASE64 string */
export const convertToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting to BASE64:', error);
    throw error;
  }
};

export const useDocumentPicker = (options: UseDocumentPickerOptions = {}) => {
  const {
    acceptedTypes = DEFAULT_ACCEPTED_TYPES,
    maxSize = DEFAULT_MAX_SIZE,
    onFilePicked,
    multiple = false,
    onFilesChanged,
    maxFiles = DEFAULT_MAX_FILES,
    includeBase64 = false,
  } = options;

  const [selectedFile, setSelectedFile] = useState<PickedFile | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<PickedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addBase64IfNeeded = async (file: PickedFile): Promise<PickedFile> => {
    if (!includeBase64) return file;
    try {
      const base64 = await convertToBase64(file.uri);
      return { ...file, base64 };
    } catch {
      return file;
    }
  };

  const handleFilePicked = async (file: PickedFile) => {
    if (file.size && file.size > maxSize) {
      Alert.alert('File too large', `Please select a file smaller than ${formatFileSize(maxSize)}`);
      return;
    }

    const processedFile = await addBase64IfNeeded(file);

    if (multiple) {
      if (selectedFiles.length >= maxFiles) {
        Alert.alert('Maximum files reached', `You can only select up to ${maxFiles} files`);
        return;
      }
      const newFiles = [...selectedFiles, processedFile];
      setSelectedFiles(newFiles);
      onFilesChanged?.(newFiles);
    } else {
      setSelectedFile(processedFile);
      onFilePicked?.(processedFile);
    }
  };

  const handleMultipleFilesPicked = async (files: PickedFile[]) => {
    const validFiles: PickedFile[] = [];
    const oversizedFiles: string[] = [];

    for (const file of files) {
      if (file.size && file.size > maxSize) {
        oversizedFiles.push(file.name);
      } else {
        const processedFile = await addBase64IfNeeded(file);
        validFiles.push(processedFile);
      }
    }

    if (oversizedFiles.length > 0) {
      Alert.alert(
        'Some files too large',
        `The following files exceed ${formatFileSize(maxSize)} and were not added: ${oversizedFiles.join(', ')}`,
      );
    }

    const availableSlots = maxFiles - selectedFiles.length;
    const filesToAdd = validFiles.slice(0, availableSlots);

    if (validFiles.length > availableSlots) {
      Alert.alert(
        'Maximum files reached',
        `Only ${filesToAdd.length} of ${validFiles.length} files were added due to the ${maxFiles} file limit`,
      );
    }

    if (filesToAdd.length > 0) {
      const newFiles = [...selectedFiles, ...filesToAdd];
      setSelectedFiles(newFiles);
      onFilesChanged?.(newFiles);
    }
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

  const requestMediaLibraryPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Photo library permission is required to select photos. Please enable it in your device settings.',
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
        await handleFilePicked({
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

  const pickFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsMultipleSelection: multiple,
        selectionLimit: multiple ? maxFiles - selectedFiles.length : 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        if (multiple && result.assets.length > 1) {
          const files: PickedFile[] = result.assets.map((asset) => ({
            uri: asset.uri,
            name: asset.uri.split('/').pop() || 'photo.jpg',
            type: asset.mimeType || 'image/jpeg',
            size: asset.fileSize,
          }));
          await handleMultipleFilesPicked(files);
        } else {
          const asset = result.assets[0];
          const fileName = asset.uri.split('/').pop() || 'photo.jpg';
          await handleFilePicked({
            uri: asset.uri,
            name: fileName,
            type: asset.mimeType || 'image/jpeg',
            size: asset.fileSize,
          });
        }
      }
    } catch (error) {
      console.error('Error picking from gallery:', error);
      Alert.alert('Error', 'Failed to select photos. Please try again.');
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
        multiple: multiple,
      });

      if (!result.canceled && result.assets.length > 0) {
        if (multiple && result.assets.length > 1) {
          const files: PickedFile[] = result.assets.map((asset) => ({
            uri: asset.uri,
            name: asset.name,
            type: asset.mimeType || 'application/octet-stream',
            size: asset.size,
          }));
          await handleMultipleFilesPicked(files);
        } else {
          const asset = result.assets[0];
          await handleFilePicked({
            uri: asset.uri,
            name: asset.name,
            type: asset.mimeType || 'application/octet-stream',
            size: asset.size,
          });
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (index?: number) => {
    if (multiple && index !== undefined) {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
      onFilesChanged?.(newFiles);
    } else {
      setSelectedFile(null);
      onFilePicked?.(null);
    }
  };

  const clearAllFiles = () => {
    if (multiple) {
      setSelectedFiles([]);
      onFilesChanged?.([]);
    } else {
      setSelectedFile(null);
      onFilePicked?.(null);
    }
  };

  return {
    // Single file mode
    selectedFile,
    // Multiple file mode
    selectedFiles,
    // Common
    isLoading,
    takePhoto,
    pickFromGallery,
    pickDocument,
    removeFile,
    clearAllFiles,
    formatFileSize,
    getFileIcon,
  };
};
