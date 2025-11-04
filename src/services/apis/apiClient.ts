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

  const response = await fetch(url, {
    method: config?.method || 'GET',
    headers,
    body: config?.body ? JSON.stringify(config.body) : undefined,
  });

  // Handle 404 for endpoints that expect it (e.g., user not found)
  if (response.status === 404 && config?.allow404) {
    return null as T;
  }

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.status}`);
  }

  // For DELETE requests that return 204 No Content, return empty response
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, options?: { headers?: Record<string, string>; allow404?: boolean }) =>
    apiClient<T>(endpoint, { method: 'GET', ...options }),

  post: <T, TBody = unknown>(endpoint: string, body?: TBody, headers?: Record<string, string>) =>
    apiClient<T, TBody>(endpoint, { method: 'POST', body, headers }),

  put: <T, TBody = unknown>(endpoint: string, body?: TBody, headers?: Record<string, string>) =>
    apiClient<T, TBody>(endpoint, { method: 'PUT', body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    apiClient<T>(endpoint, { method: 'DELETE', headers }),

  patch: <T, TBody = unknown>(endpoint: string, body?: TBody, headers?: Record<string, string>) =>
    apiClient<T, TBody>(endpoint, { method: 'PATCH', body, headers }),
};
