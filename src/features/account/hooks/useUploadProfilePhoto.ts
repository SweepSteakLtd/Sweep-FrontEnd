import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth, firebaseStorage } from '~/lib/firebase';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';

// Lazy import to avoid loading the native module until it's actually needed
const loadImageManipulator = async () => {
  return await import('expo-image-manipulator');
};

// Configuration constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DIMENSION = 800; // Max width/height
const COMPRESSION_QUALITY = 0.8; // JPEG quality (0-1)
const STORAGE_PATH_PREFIX = 'users'; // Storage path: users/{userId}/profile-photo.jpg

interface UploadState {
  isSelecting: boolean;
  isUploading: boolean;
  uploadProgress: number;
  previewUri: string | null;
}

export const useUploadProfilePhoto = () => {
  const { showAlert } = useAlert();
  const updateUserMutation = useUpdateUser();
  const [state, setState] = useState<UploadState>({
    isSelecting: false,
    isUploading: false,
    uploadProgress: 0,
    previewUri: null,
  });

  // Request gallery permission
  const requestGalleryPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert({
        title: 'Permission Required',
        message:
          'Photo library permission is required to select photos. Please enable it in your device settings.',
      });
      return false;
    }
    return true;
  };

  // Resize and compress image
  const processImage = async (uri: string): Promise<{ uri: string; size: number }> => {
    // Lazy load the native module
    const ImageManipulator = await loadImageManipulator();
    
    // Resize to max dimension while maintaining aspect ratio
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_DIMENSION } }], // Auto-calculates height
      {
        compress: COMPRESSION_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );

    // Get file size by fetching the file info
    const response = await fetch(result.uri);
    const blob = await response.blob();
    const size = blob.size;

    return { uri: result.uri, size };
  };

  // Upload to Firebase Storage
  const uploadToStorage = async (uri: string): Promise<string> => {
    const userId = firebaseAuth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Create storage reference: users/{userId}/profile-photo.jpg
    const storagePath = `${STORAGE_PATH_PREFIX}/${userId}/profile-photo.jpg`;
    const storageRef = ref(firebaseStorage, storagePath);

    // Convert URI to blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload to Firebase Storage
    await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle image selection and upload
  const handleImageSelected = async (uri: string) => {
    try {
      setState((prev) => ({ ...prev, isUploading: true, uploadProgress: 0 }));

      // Process image (resize + compress)
      const processed = await processImage(uri);

      // Validate file size after compression
      if (processed.size > MAX_FILE_SIZE) {
        showAlert({
          title: 'File Too Large',
          message: `Image is ${(processed.size / 1024 / 1024).toFixed(1)}MB. Please select a smaller image.`,
        });
        setState((prev) => ({ ...prev, isUploading: false }));
        return;
      }

      setState((prev) => ({ ...prev, uploadProgress: 30 }));

      // Upload to Firebase Storage
      const downloadURL = await uploadToStorage(processed.uri);

      setState((prev) => ({ ...prev, uploadProgress: 70 }));

      // Update user profile via API
      await updateUserMutation.mutateAsync({
        profile_picture: downloadURL,
      });

      setState((prev) => ({ ...prev, uploadProgress: 100, isUploading: false }));

      // Show success alert
      showAlert({
        title: 'Success',
        message: 'Profile photo updated successfully',
      });
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      setState((prev) => ({ ...prev, isUploading: false, uploadProgress: 0 }));

      showAlert({
        title: 'Upload Failed',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to upload profile photo. Please try again.',
      });
    }
  };

  // Pick from gallery (shows preview instead of immediately uploading)
  const pickFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    setState((prev) => ({ ...prev, isSelecting: true }));

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1, // We'll compress manually
        allowsEditing: true, // Allow user to crop/position
        aspect: [1, 1], // Square crop
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets[0]) {
        // Set preview URI instead of uploading immediately
        setState((prev) => ({ ...prev, previewUri: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Error picking from gallery:', error);
      showAlert({
        title: 'Error',
        message: 'Failed to select photo. Please try again.',
      });
    } finally {
      setState((prev) => ({ ...prev, isSelecting: false }));
    }
  };

  // Confirm and upload the previewed image
  const confirmUpload = async () => {
    if (!state.previewUri) return;

    try {
      await handleImageSelected(state.previewUri);
      // Clear preview on success
      setState((prev) => ({ ...prev, previewUri: null }));
    } catch (error) {
      // Error is already handled in handleImageSelected
      console.error('Upload confirmation failed:', error);
    }
  };

  // Cancel upload and clear preview
  const cancelUpload = () => {
    setState((prev) => ({ ...prev, previewUri: null }));
  };

  return {
    pickFromGallery,
    confirmUpload,
    cancelUpload,
    previewUri: state.previewUri,
    isLoading: state.isSelecting || state.isUploading,
    isUploading: state.isUploading,
    uploadProgress: state.uploadProgress,
  };
};
