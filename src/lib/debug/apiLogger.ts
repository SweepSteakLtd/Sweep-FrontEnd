/**
 * API Debug Logger
 * Logs all API requests and responses in development mode only
 */

// Debug logging flag - enabled in development only
const DEBUG_API = __DEV__;

/**
 * Formats JSON data with proper indentation and structure
 */
const formatJSON = (data: unknown): string => {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
};

/**
 * Log API request details (debug only)
 */
export const logApiRequest = (url: string, method: string, init?: RequestInit) => {
  if (!DEBUG_API || !url.includes('/api/')) return;

  console.log('\n┌─────────────────────────────────────────────────────────────');
  console.log(`│ 🔵 API REQUEST: ${method} ${url}`);
  console.log('├─────────────────────────────────────────────────────────────');

  if (init?.headers) {
    console.log('│ Headers:');
    const formattedHeaders = formatJSON(init.headers);
    formattedHeaders.split('\n').forEach((line) => console.log(`│   ${line}`));
  }

  if (init?.body) {
    try {
      const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
      console.log('│ Body:');
      const formattedBody = formatJSON(body);
      formattedBody.split('\n').forEach((line) => console.log(`│   ${line}`));
    } catch {
      console.log('│ Body:', init.body);
    }
  }

  console.log('└─────────────────────────────────────────────────────────────\n');
};

/**
 * Log API response details (debug only)
 */
export const logApiResponse = async (
  url: string,
  method: string,
  response: Response,
  isMocked: boolean,
) => {
  if (!DEBUG_API || !url.includes('/api/')) return;

  // Clone the response so we can read the body without consuming it
  const clonedResponse = response.clone();

  const statusIcon = response.ok ? '🟢' : '🔴';
  const typeLabel = isMocked ? '📦 MOCKED' : '🌐 REAL';

  console.log('\n┌─────────────────────────────────────────────────────────────');
  console.log(`│ ${statusIcon} API RESPONSE: ${method} ${url}`);
  console.log('├─────────────────────────────────────────────────────────────');
  console.log(`│ Status: ${response.status} ${response.statusText}`);
  console.log(`│ Type: ${typeLabel}`);
  console.log('├─────────────────────────────────────────────────────────────');

  try {
    const data = await clonedResponse.json();
    console.log('│ Response Data:');
    const formattedData = formatJSON(data);
    formattedData.split('\n').forEach((line) => console.log(`│   ${line}`));
  } catch (error) {
    console.log('│ Body: (not JSON or empty)');
  }

  console.log('└─────────────────────────────────────────────────────────────\n');
};
