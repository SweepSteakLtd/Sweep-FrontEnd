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

  const parts = [`🔵 API REQUEST: ${method} ${url}`];

  if (init?.headers) {
    parts.push(`Headers: ${formatJSON(init.headers)}`);
  }

  if (init?.body) {
    try {
      const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
      parts.push(`Body: ${formatJSON(body)}`);
    } catch {
      parts.push(`Body: ${init.body}`);
    }
  }

  console.log(parts.join('\n'));
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

  const parts = [
    `${statusIcon} API RESPONSE: ${method} ${url}`,
    `Status: ${response.status} ${response.statusText}`,
    `Type: ${typeLabel}`,
  ];

  try {
    const data = await clonedResponse.json();
    parts.push(`Response Data: ${formatJSON(data)}`);
  } catch (error) {
    parts.push('Body: (not JSON or empty)');
  }

  console.log(parts.join('\n'));
};
