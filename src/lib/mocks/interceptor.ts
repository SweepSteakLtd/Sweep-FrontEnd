import { logApiRequest, logApiResponse } from '~/lib/debug/apiLogger';
import { mockHandlers } from './handlers/registry';
import { getMockConfig } from './storage';
import type { MockConfig, MockHandler } from './types';

// Store the original fetch (before any interception)
const originalFetch = global.fetch;

// Track if interceptor has been installed
let isInstalled = false;

// In-memory cache of mock config (refreshed periodically)
let cachedMockConfig: MockConfig | null = null;
let lastConfigLoad = 0;
const CONFIG_CACHE_MS = 1000; // Refresh config every second

/**
 * Get mock config with caching
 */
const getCachedMockConfig = async (): Promise<MockConfig> => {
  const now = Date.now();
  if (!cachedMockConfig || now - lastConfigLoad > CONFIG_CACHE_MS) {
    cachedMockConfig = await getMockConfig();
    lastConfigLoad = now;
  }
  return cachedMockConfig;
};

/**
 * Check if a request matches a mock handler
 */
const findMatchingHandler = (
  url: string,
  method: string,
  config: MockConfig,
): MockHandler | null => {
  // Only log for API calls
  const isApiCall = url.includes('/api/');

  if (!config.globalEnabled) {
    if (isApiCall) {
      console.log(`[MockInterceptor]: Mock globally disabled, passing through: ${method} ${url}`);
    }
    return null;
  }

  for (const handler of mockHandlers) {
    const handlerConfig = config.handlers[handler.id];

    // Check if handler is enabled in config
    if (!handlerConfig?.enabled) {
      continue;
    }

    // Check if method matches
    if (handler.method !== method.toUpperCase()) {
      continue;
    }

    // Check if URL matches (contains the handler URL pattern)
    if (!url.includes(handler.urlPattern)) {
      continue;
    }

    return handler;
  }

  if (isApiCall) {
    console.log(
      `[MockInterceptor]: No mock handler matched for ${method} ${url} (mocks are enabled but no handler configured)`,
    );
  }

  return null;
};

/**
 * Create a mock Response object
 */
const createMockResponse = (status: number, data: any): Response => {
  const body = JSON.stringify(data);

  return new Response(body, {
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {
      'Content-Type': 'application/json',
      'X-Mock-Response': 'true',
    },
  });
};

/**
 * Intercepted fetch function
 */
const mockedFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : input.toString();
  const method = init?.method || 'GET';

  // Log the request
  logApiRequest(url, method, init);

  try {
    const config = await getCachedMockConfig();
    const handler = findMatchingHandler(url, method, config);

    if (handler) {
      const handlerConfig = config.handlers[handler.id];
      const selectedScenario = handlerConfig?.selectedScenario || handler.defaultScenario;

      if (!selectedScenario) {
        console.warn(`[MockInterceptor]: No scenario selected for ${handler.name}`);
        const response = await originalFetch(input, init);
        await logApiResponse(url, method, response, false);
        return response;
      }

      const mockResponse = handler.scenarios[selectedScenario];

      if (!mockResponse) {
        console.warn(
          `[MockInterceptor]: Scenario '${selectedScenario}' not found for ${handler.name}`,
        );
        const response = await originalFetch(input, init);
        await logApiResponse(url, method, response, false);
        return response;
      }

      // Determine delay with priority: global > handler > scenario
      const delay = config.globalDelay ?? handlerConfig?.delay ?? mockResponse.delay ?? 0;

      console.log(
        `[MockInterceptor]: 🎭 Mocking ${method} ${url}`,
        `\n  Handler: ${handler.name}`,
        `\n  Scenario: ${selectedScenario}`,
        `\n  Status: ${mockResponse.status}`,
        `\n  Delay: ${delay}ms`,
      );

      // Simulate network delay if specified
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const response = createMockResponse(mockResponse.status, mockResponse.data);
      await logApiResponse(url, method, response, true);
      return response;
    }
  } catch (error) {
    console.error('[MockInterceptor]: Error in mock interceptor:', error);
    // Fall through to original fetch on error
  }

  // No mock matched or error occurred - use original fetch
  const response = await originalFetch(input, init);
  await logApiResponse(url, method, response, false);
  return response;
};

/**
 * Install the mock interceptor globally
 */
export const installMockInterceptor = () => {
  if (!isInstalled) {
    global.fetch = mockedFetch as any;
    isInstalled = true;
    console.log('[MockInterceptor]: ✅ Mock interceptor installed');
  }
};

/**
 * Uninstall the mock interceptor (restore original fetch)
 */
export const uninstallMockInterceptor = () => {
  if (isInstalled) {
    global.fetch = originalFetch;
    isInstalled = false;
    console.log('[MockInterceptor]: ❌ Mock interceptor uninstalled');
  }
};

/**
 * Force refresh the cached mock config
 */
export const refreshMockConfig = async () => {
  cachedMockConfig = await getMockConfig();
  lastConfigLoad = Date.now();
};
