export interface MockResponse {
  status: number;
  data: unknown;
  delay?: number;
}

export interface MockHandler {
  id: string;
  name: string;
  group: 'User' | 'Tournament' | 'Game' | 'League' | 'Bet' | 'Team' | 'Player';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  urlPattern: string;
  scenarios: Record<string, MockResponse>;
  defaultScenario: string;
  isAdmin?: boolean; // Flag to indicate admin-only endpoints
  postProcessor?: (url: string, data: unknown) => unknown; // Optional function to process response data
}

export interface MockConfig {
  globalEnabled: boolean;
  globalDelay: number | null; // If set, overrides all delays
  handlers: Record<
    string,
    {
      enabled: boolean;
      selectedScenario: string;
      delay: number | null; // If set, overrides scenario delays for this handler
    }
  >;
}
