/**
 * API Debug Logger
 * Logs all API requests and responses in development mode only
 */

// Debug logging flag - enabled in development only
const DEBUG_API = __DEV__;

// Set to false to see full logs
const TRUNCATE_LOGS = true;
const MAX_LINES = 5;
const MAX_STRING_LENGTH = 200;

/**
 * Truncates long strings (like base64 data) in objects
 */
const truncateLongStrings = (data: unknown): unknown => {
  if (typeof data === 'string') {
    if (data.length > MAX_STRING_LENGTH) {
      return `${data.substring(0, MAX_STRING_LENGTH)}... [truncated ${data.length - MAX_STRING_LENGTH} chars]`;
    }
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(truncateLongStrings);
  }

  if (data && typeof data === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = truncateLongStrings(value);
    }
    return result;
  }

  return data;
};

/**
 * Formats JSON data with proper indentation and structure
 */
const formatJSON = (data: unknown): string => {
  try {
    if (!TRUNCATE_LOGS) {
      return JSON.stringify(data, null, 2);
    }

    const truncatedData = truncateLongStrings(data);
    const formatted = JSON.stringify(truncatedData, null, 2);
    const lines = formatted.split('\n');

    if (lines.length > MAX_LINES) {
      return (
        lines.slice(0, MAX_LINES).join('\n') + `\n... [${lines.length - MAX_LINES} more lines]`
      );
    }

    return formatted;
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
