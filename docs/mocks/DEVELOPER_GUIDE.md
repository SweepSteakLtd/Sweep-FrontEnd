# Mock API Developer Guide

This guide explains how to create, configure, and use the mock API system for development and testing.

## Overview

The mock system intercepts HTTP fetch requests and returns configurable mock responses. This allows developers to:

- Develop UI features without a running backend
- Test error states and edge cases
- Simulate network delays
- Work offline

## Architecture

```
src/lib/mocks/
├── interceptor.ts          # Global fetch interceptor
├── storage.ts              # AsyncStorage persistence
├── types.ts                # TypeScript interfaces
├── handlers/               # Mock endpoint handlers
│   ├── registry.ts         # Handler registry
│   ├── userHandler.ts      # User endpoints
│   ├── tournamentHandler.ts
│   ├── leagueHandler.ts
│   ├── teamHandler.ts
│   ├── playerProfileHandler.ts
│   ├── leaderboardHandler.ts
│   ├── betHandler.ts
│   ├── gbgHandler.ts
│   ├── profileHandler.ts
│   └── adminHandler.ts
└── postRequestProcessors/  # Response processors
    ├── index.ts
    ├── types.ts
    ├── bypassVerification.ts
    └── bypassGBGVerification.ts
```

## Enabling Mocks

### Development UI

1. Open the app and go to the **Login screen**
2. Tap the **Dev Mock Button** (gear icon, appears in development builds)
3. Use the configuration panel to:
   - Toggle mocks globally on/off
   - Enable/disable individual endpoints
   - Select response scenarios
   - Configure delays

### Programmatic Control

```typescript
import { installMockInterceptor, uninstallMockInterceptor } from '~/lib/mocks/interceptor';

// Install the mock interceptor
installMockInterceptor();

// Uninstall (restore original fetch)
uninstallMockInterceptor();
```

## Creating a New Mock Handler

### Step 1: Define Mock Data

Create mock response data in the feature's mocks file:

```typescript
// src/features/myFeature/mocks.ts

export const myFeatureSuccessMock = {
  data: {
    id: 'mock-id-001',
    name: 'Mock Item',
    status: 'active',
    created_at: new Date().toISOString(),
  },
};

export const myFeatureErrorMock = {
  error: 'Failed to fetch item',
};

export const myFeatureNotFoundMock = {
  error: 'Item not found',
};
```

### Step 2: Create the Handler

Create a handler file in `src/lib/mocks/handlers/`:

```typescript
// src/lib/mocks/handlers/myFeatureHandler.ts

import {
  myFeatureSuccessMock,
  myFeatureErrorMock,
  myFeatureNotFoundMock,
} from '~/features/myFeature/mocks';
import type { MockHandler } from '../types';

export const getMyFeatureHandler: MockHandler = {
  // Unique identifier for this handler
  id: 'get-my-feature',

  // Display name in the mock config UI
  name: 'Get My Feature',

  // Grouping in the mock config UI
  group: 'Game', // Options: 'User' | 'Tournament' | 'Game' | 'League' | 'Bet' | 'Team' | 'Player' | 'Leaderboard'

  // HTTP method
  method: 'GET',

  // URL pattern to match (uses string.includes())
  urlPattern: '/api/my-feature',

  // Default scenario when first enabled
  defaultScenario: 'Success',

  // Available response scenarios
  scenarios: {
    'Success': {
      status: 200,
      data: myFeatureSuccessMock,
      delay: 500, // Simulated network delay in ms
    },
    'Not Found (404)': {
      status: 404,
      data: myFeatureNotFoundMock,
      delay: 300,
    },
    'Server Error (500)': {
      status: 500,
      data: myFeatureErrorMock,
      delay: 1000,
    },
  },

  // Optional: Post-process the response data
  postProcessor: (url: string, data: unknown) => {
    // Modify data based on URL params, etc.
    return data;
  },
};
```

### Step 3: Register the Handler

Add your handler to the registry:

```typescript
// src/lib/mocks/handlers/registry.ts

import { getMyFeatureHandler } from './myFeatureHandler';

export const mockHandlers: MockHandler[] = [
  // ... existing handlers

  // My Feature endpoints
  getMyFeatureHandler,
];
```

## Handler Configuration

### MockHandler Interface

```typescript
interface MockHandler {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  group: string;                 // UI grouping
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  urlPattern: string;            // URL pattern to match
  scenarios: Record<string, MockResponse>;
  defaultScenario: string;       // Initial scenario
  isAdmin?: boolean;             // Admin-only flag
  postProcessor?: (url: string, data: unknown) => unknown;
}

interface MockResponse {
  status: number;                // HTTP status code
  data: unknown;                 // Response body
  delay?: number;                // Network delay (ms)
}
```

### URL Pattern Matching

The interceptor matches URLs using `string.includes()`:

```typescript
// Handler with urlPattern: '/api/leagues'
// Matches:
//   /api/leagues
//   /api/leagues?tournament_id=123
//   /api/leagues/456

// For more specific matching, use longer patterns:
// urlPattern: '/api/leagues/' matches /api/leagues/456 but not /api/leagues
```

When multiple handlers match, the **most specific** (longest pattern) wins.

### Post Processors

Post processors allow dynamic response modification based on request parameters:

```typescript
export const getLeaguesHandler: MockHandler = {
  // ...
  postProcessor: (url: string, data: unknown) => {
    const urlObj = new URL(url, 'http://localhost');
    const tournamentId = urlObj.searchParams.get('tournament_id');

    if (tournamentId && Array.isArray((data as any).data)) {
      return {
        data: (data as any).data.filter(
          (item: any) => item.tournament_id === tournamentId
        )
      };
    }

    return data;
  },
};
```

## Mock Configuration Storage

Mock configuration is persisted to AsyncStorage:

```typescript
interface MockConfig {
  globalEnabled: boolean;        // Master toggle
  globalDelay: number | null;    // Override all delays
  handlers: Record<string, {
    enabled: boolean;
    selectedScenario: string;
    delay: number | null;        // Override scenario delay
  }>;
}
```

### Delay Priority

1. Global delay (if set)
2. Handler-specific delay (if set)
3. Scenario delay

## Best Practices

### 1. Realistic Mock Data

Use realistic data that matches the API schema:

```typescript
// Good - matches real API structure
export const userMock = {
  data: {
    id: 'usr_abc123',
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    is_identity_verified: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
};

// Avoid - doesn't match schema
export const userMock = {
  data: {
    id: '1',
    name: 'Test',
  },
};
```

### 2. Include Error Scenarios

Always include common error scenarios:

```typescript
scenarios: {
  'Success': { status: 200, data: successMock, delay: 500 },
  'Empty List': { status: 200, data: { data: [] }, delay: 300 },
  'Not Found (404)': { status: 404, data: notFoundMock, delay: 300 },
  'Unauthorized (401)': { status: 401, data: unauthorizedMock, delay: 200 },
  'Validation Error (422)': { status: 422, data: validationErrorMock, delay: 300 },
  'Server Error (500)': { status: 500, data: serverErrorMock, delay: 1000 },
}
```

### 3. Use Consistent Naming

- Handler IDs: `kebab-case` (e.g., `get-user-profile`, `create-team`)
- Scenario names: `Title Case` with status codes (e.g., `Not Found (404)`)
- Groups: Match existing groups where possible

### 4. Document Mock Data

```typescript
// src/features/myFeature/mocks.ts

/**
 * Mock data for GET /api/my-feature
 * Based on OpenAPI schema: MyFeatureResponse
 *
 * @see https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/swaggerui/
 */
export const myFeatureMock = {
  // ...
};
```

### 5. Keep Mocks in Sync with API

When the API changes:
1. Run `yarn generate-schemas` to update TypeScript types
2. Update mock data to match new schema
3. Run `yarn export-mocks` to regenerate documentation

## Debugging

### Console Logs

The interceptor logs all mock activity:

```
[MockInterceptor]: Mock interceptor installed
[MockInterceptor]: Mocking GET /api/users/me
  Handler: Get User Profile
  Scenario: Complete Profile
  Status: 200
  Delay: 500ms
```

### Check Mock Status

```typescript
import { getMockConfig } from '~/lib/mocks/storage';

const config = await getMockConfig();
console.log('Mocks enabled:', config.globalEnabled);
console.log('Handler configs:', config.handlers);
```

### Common Issues

**Mock not triggering:**
- Check if mocks are globally enabled
- Check if the specific handler is enabled
- Verify URL pattern matches the request URL
- Check console for interceptor logs

**Wrong response returned:**
- Check selected scenario in mock config
- Verify handler has the correct `defaultScenario`

## Exporting Mock Documentation

Run the mock export script to generate documentation:

```bash
yarn export-mocks
```

This updates:
- `docs/mocks/README.md` - Human-readable endpoint list
- `docs/mocks/mock-documentation.json` - JSON format for tools
- `docs/mocks/openapi.json` - OpenAPI 3.0 spec

## Example: Complete Handler Implementation

Here's a complete example for a new "Activity" feature:

```typescript
// src/features/activity/mocks.ts
export const activityListMock = {
  data: [
    {
      id: 'act-001',
      type: 'team_created',
      message: 'You created team "Dream Team"',
      created_at: '2024-01-15T10:30:00Z',
    },
    {
      id: 'act-002',
      type: 'league_joined',
      message: 'You joined "Masters 2024"',
      created_at: '2024-01-14T09:15:00Z',
    },
  ],
};

export const activityEmptyMock = {
  data: [],
};

export const activityErrorMock = {
  error: 'Failed to fetch activity',
};

// src/lib/mocks/handlers/activityHandler.ts
import {
  activityListMock,
  activityEmptyMock,
  activityErrorMock,
} from '~/features/activity/mocks';
import type { MockHandler } from '../types';

export const getActivityHandler: MockHandler = {
  id: 'get-activity',
  name: 'Get Activity Feed',
  group: 'User',
  method: 'GET',
  urlPattern: '/api/activity',
  defaultScenario: 'Success',
  scenarios: {
    'Success': {
      status: 200,
      data: activityListMock,
      delay: 500,
    },
    'Empty': {
      status: 200,
      data: activityEmptyMock,
      delay: 300,
    },
    'Server Error (500)': {
      status: 500,
      data: activityErrorMock,
      delay: 1000,
    },
  },
};

// src/lib/mocks/handlers/registry.ts
import { getActivityHandler } from './activityHandler';

export const mockHandlers: MockHandler[] = [
  // ... existing handlers
  getActivityHandler,
];
```
