import { firebaseAuth } from '~/lib/firebase';

/**
 * Centralized API client for making authenticated requests
 */

interface ApiClientConfig<TBody = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: TBody;
  headers?: Record<string, string>;
  /** If true, returns null on 404 instead of throwing an error */
  allow404?: boolean;
  /** Custom timeout in milliseconds (default: 30000ms) */
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Makes an authenticated API request with Firebase token
 */
export async function apiClient<T, TBody = unknown>(
  endpoint: string,
  config?: ApiClientConfig<TBody>,
): Promise<T> {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-auth-id': token,
    ...config?.headers,
  };

  const timeout = config?.timeout || 30000; // Default 30 seconds

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: config?.method || 'GET',
      headers,
      body: config?.body ? JSON.stringify(config.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 404 for endpoints that expect it (e.g., user not found)
    if (response.status === 404 && config?.allow404) {
      return null as T;
    }

    if (!response.ok) {
      // Try to extract error message from response body
      let errorMessage = `API request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If response is not JSON, use default message
      }
      throw new ApiError(response.status, errorMessage);
    }

    // For DELETE requests that return 204 No Content, return empty response
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(
    endpoint: string,
    options?: { headers?: Record<string, string>; allow404?: boolean; timeout?: number },
  ) => apiClient<T>(endpoint, { method: 'GET', ...options }),

  post: <T, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>,
    timeout?: number,
  ) => apiClient<T, TBody>(endpoint, { method: 'POST', body, headers, timeout }),

  put: <T, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>,
    timeout?: number,
  ) => apiClient<T, TBody>(endpoint, { method: 'PUT', body, headers, timeout }),

  delete: <T>(endpoint: string, headers?: Record<string, string>, timeout?: number) =>
    apiClient<T>(endpoint, { method: 'DELETE', headers, timeout }),

  patch: <T, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    headers?: Record<string, string>,
    timeout?: number,
  ) => apiClient<T, TBody>(endpoint, { method: 'PATCH', body, headers, timeout }),
};
