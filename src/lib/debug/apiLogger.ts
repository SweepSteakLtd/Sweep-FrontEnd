/**
 * API Debug Logger
 * Logs all API requests and responses in development mode only
 */

// Debug logging flag - enabled in development only
const DEBUG_API = __DEV__;

/**
 * Log API request details (debug only)
 */
export const logApiRequest = (url: string, method: string, init?: RequestInit) => {
  if (!DEBUG_API || !url.includes('/api/')) return;

  console.log(`\n🔵 API REQUEST: ${method} ${url}`);

  if (init?.headers) {
    console.log('  Headers:', init.headers);
  }

  if (init?.body) {
    try {
      const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
      console.log('  Body:', body);
    } catch {
      console.log('  Body:', init.body);
    }
  }
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

  try {
    const data = await clonedResponse.json();
    console.log(`🟢 API RESPONSE: ${method} ${url}`);
    console.log(`  Status: ${response.status} ${response.statusText}`);
    console.log(`  Type: ${isMocked ? 'MOCKED' : 'REAL'}`);
    console.log('  Data:', data);
  } catch (error) {
    console.log(`🟢 API RESPONSE: ${method} ${url}`);
    console.log(`  Status: ${response.status} ${response.statusText}`);
    console.log(`  Type: ${isMocked ? 'MOCKED' : 'REAL'}`);
    console.log('  Body: (not JSON or empty)');
  }
};
