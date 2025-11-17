/**
 * Post-request processor function type
 * Processes API responses after they are received (for real API calls only, not mocks)
 */
export type PostRequestProcessor = (url: string, response: Response) => Promise<Response>;
