import { bypassGBGVerificationProcessor } from './bypassGBGVerification';
import { bypassVerificationProcessor } from './bypassVerification';
import type { PostRequestProcessor } from './types';

/**
 * Array of post-request processors
 * Add new processors here to apply them to all real API responses
 */
export const postRequestProcessors: PostRequestProcessor[] = [
  bypassVerificationProcessor,
  bypassGBGVerificationProcessor,
];

/**
 * Process a response through all registered processors
 */
export const processResponse = async (url: string, response: Response): Promise<Response> => {
  let processedResponse = response;

  for (const processor of postRequestProcessors) {
    processedResponse = await processor(url, processedResponse);
  }

  return processedResponse;
};

export type { PostRequestProcessor } from './types';
