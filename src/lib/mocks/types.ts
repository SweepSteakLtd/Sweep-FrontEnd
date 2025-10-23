export interface MockResponse {
  status: number;
  data: any;
  delay?: number;
}

export interface MockHandler {
  id: string;
  name: string;
  group: 'User' | 'Tournament' | 'Game' | 'Bet';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  urlPattern: string;
  scenarios: Record<string, MockResponse>;
  defaultScenario: string;
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
