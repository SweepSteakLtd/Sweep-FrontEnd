import { getBypassVerification } from '../storage';
import type { PostRequestProcessor } from './types';

/**
 * Post-request processor that modifies /api/users/verify/gbg responses
 * to return PASS status when bypass verification is enabled
 */
export const bypassGBGVerificationProcessor: PostRequestProcessor = async (
  url: string,
  response: Response,
): Promise<Response> => {
  // Only process /api/users/verify/gbg responses
  if (!url.includes('/api/users/verify/gbg')) {
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

    console.log('[PostRequestProcessor]: Bypass verification enabled - setting GBG status to PASS');

    // Modify the response to return PASS status
    const modifiedData = {
      ...data,
      status: 'PASS',
      message: 'Verification bypassed',
    };

    // Create a new response with the modified data
    return new Response(JSON.stringify(modifiedData), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('[PostRequestProcessor]: Error processing bypass GBG verification:', error);
    return response;
  }
};
