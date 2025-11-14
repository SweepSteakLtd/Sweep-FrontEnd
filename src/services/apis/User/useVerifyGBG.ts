import { api } from '../apiClient';

export type GBGVerificationStatus = 'PASS' | 'IN_PROGRESS' | 'MANUAL' | 'FAIL';

export interface GBGVerificationResponse {
  status: GBGVerificationStatus;
  message?: string;
}

/**
 * Poll GBG verification status for a given instance ID
 */
export const verifyGBG = async (instanceId: string): Promise<GBGVerificationResponse> => {
  return api.get<GBGVerificationResponse>(`/api/users/verify/gbg?instance_id=${instanceId}`);
};
