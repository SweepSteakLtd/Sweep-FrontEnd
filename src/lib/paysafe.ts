/**
 * Paysafe Configuration
 *
 * @deprecated This file is no longer used. Paysafe API keys are now fetched
 * dynamically from the backend via the useGetPublicKey hook.
 *
 * See: src/services/apis/Payment/useGetPublicKey.ts
 *
 * The backend endpoint /api/payments/public-key provides:
 * - apiKey: Base64-encoded public API key
 * - environment: 'TEST' or 'LIVE'
 *
 * This approach is more secure as:
 * 1. API keys are managed centrally on the backend
 * 2. Keys can be rotated without rebuilding the frontend
 * 3. Different users can have different configurations if needed
 */

export type PaysafeEnvironment = 'TEST' | 'LIVE';

export interface PaysafeConfig {
  apiKey: string;
  environment: PaysafeEnvironment;
}

// This export is kept for backwards compatibility but should not be used
export const paysafeConfig: PaysafeConfig = {
  apiKey: '',
  environment: 'TEST',
};
