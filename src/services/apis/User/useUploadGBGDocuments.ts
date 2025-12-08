import { useMutation } from '@tanstack/react-query';
import { api } from '../apiClient';

export interface UploadGBGDocumentsParams {
  /** Array of base64-encoded JPEG images with data URI prefix */
  documents: string[];
}

export interface UploadGBGDocumentsResponse {
  data: {
    instanceId: string;
    taskId: string;
    message: string;
  };
}

/**
 * Upload identity documents for GBG verification
 *
 * Documents must be:
 * - Base64-encoded JPEG images
 * - Format: "data:image/jpeg;base64,..."
 * - Max 10MB per document
 *
 * User must have first_name, last_name, and active kyc_instance_id
 */
const uploadGBGDocuments = async (
  params: UploadGBGDocumentsParams,
): Promise<UploadGBGDocumentsResponse> => {
  // Document upload can take time for large files
  return api.post<UploadGBGDocumentsResponse>('/api/users/upload/gbg', params, undefined, 60000);
};

/**
 * Hook to upload identity documents for GBG verification
 *
 * POST /api/users/upload/gbg
 */
export const useUploadGBGDocuments = () => {
  return useMutation({
    mutationFn: uploadGBGDocuments,
  });
};

/**
 * Helper to convert a base64 string to data URI format for JPEG
 * @param base64 - Raw base64 string without prefix
 * @returns Data URI formatted string
 */
export const toJpegDataUri = (base64: string): string => {
  return `data:image/jpeg;base64,${base64}`;
};
