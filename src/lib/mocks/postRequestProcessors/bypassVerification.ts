import { getBypassVerification } from '../storage';
import type { PostRequestProcessor } from './types';

/**
 * Post-request processor that modifies /api/users/me responses
 * to set is_identity_verified=true when bypass verification is enabled
 */
export const bypassVerificationProcessor: PostRequestProcessor = async (
  url: string,
  response: Response,
): Promise<Response> => {
  // Only process /api/users/me responses
  if (!url.includes('/api/users/me')) {
    return response;
  }

  // Only process successful responses
  if (!response.ok) {
    return response;
  }

  const bypassEnabled = await getBypassVerification();
  if (!bypassEnabled) {
    return response;
  }

  try {
    const clonedResponse = response.clone();
    const data = await clonedResponse.json();

    console.log(
      '[PostRequestProcessor]: Bypass verification enabled - setting is_identity_verified=true',
    );

    // Modify the response data
    const modifiedData = modifyResponseData(data);

    // Create a new response with the modified data
    return new Response(JSON.stringify(modifiedData), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('[PostRequestProcessor]: Error processing bypass verification:', error);
    return response;
  }
};

/**
 * Modify response data to set is_identity_verified=true
 */
const modifyResponseData = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  // Handle both direct user object and {data: user} structure
  if ('data' in data && data.data && typeof data.data === 'object') {
    return {
      ...data,
      data: {
        ...data.data,
        is_identity_verified: true,
      },
    };
  }

  return {
    ...data,
    is_identity_verified: true,
  };
};
