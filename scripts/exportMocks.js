#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import handlers directly
const registryPath = path.join(__dirname, '../src/lib/mocks/handlers/registry.ts');

/**
 * Load mock data from mocks.ts files
 */
function loadMockData(mockName) {
  // Find the mocks.ts file that contains this mock
  const possiblePaths = [
    path.join(__dirname, '../src/features/auth/mocks.ts'),
    path.join(__dirname, '../src/features/tournaments/mocks.ts'),
    path.join(__dirname, '../src/features/games/mocks.ts'),
    // Add more feature paths as needed
  ];

  for (const mocksPath of possiblePaths) {
    if (fs.existsSync(mocksPath)) {
      const content = fs.readFileSync(mocksPath, 'utf-8');

      // Find the export for this mock
      const exportPattern = new RegExp(`export const ${mockName}\\s*=\\s*({[\\s\\S]*?^});`, 'm');
      const match = content.match(exportPattern);

      if (match) {
        try {
          // Clean up the object string and parse it
          let objString = match[1];
          // Replace new Date().toISOString() with a placeholder
          objString = objString.replace(/new Date\(\)\.toISOString\(\)/g, '"<timestamp>"');
          // Use eval to parse (safe since we control the source)
          return eval(`(${objString})`);
        } catch (e) {
          console.warn(`⚠️  Could not parse mock data for ${mockName}`);
        }
      }
    }
  }

  return null;
}

/**
 * Load handlers from registry
 */
function loadHandlers() {
  // Read and parse the registry file
  const registryContent = fs.readFileSync(registryPath, 'utf-8');

  // Extract handler imports (userHandler, profileHandler, etc.)
  const importMatches = registryContent.matchAll(/import.*?\{([^}]+)\}.*?from\s+['"](.+?)['"]/g);
  const handlers = [];

  for (const match of importMatches) {
    const handlerFile = match[2];
    const fullPath = path.join(__dirname, '../src/lib/mocks/handlers', handlerFile + '.ts');

    if (fs.existsSync(fullPath)) {
      // Read the handler file
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Extract handler object using regex
      const handlerMatch = content.match(/export const \w+: MockHandler = ({[\s\S]*?^});/m);
      if (handlerMatch) {
        const id = content.match(/id:\s*['"]([^'"]+)['"]/)?.[1];
        const name = content.match(/name:\s*['"]([^'"]+)['"]/)?.[1];
        const method = content.match(/method:\s*['"]([^'"]+)['"]/)?.[1];
        const urlPattern = content.match(/urlPattern:\s*['"]([^'"]+)['"]/)?.[1];
        const defaultScenario = content.match(/defaultScenario:\s*['"]([^'"]+)['"]/)?.[1];

        // Extract scenarios - match the entire scenarios object
        const scenariosMatch = content.match(/scenarios:\s*\{([\s\S]*?)\n  \}/);
        const scenarios = {};

        if (scenariosMatch) {
          const scenariosContent = scenariosMatch[1];

          // Match scenario names - they're keys in the scenarios object
          const scenarioNameMatches = scenariosContent.matchAll(/['"]?([^'":\n]+?)['"]?\s*:\s*\{/g);

          for (const nameMatch of scenarioNameMatches) {
            const scenarioName = nameMatch[1].trim();

            // Find the full scenario block for this name
            const escapedName = scenarioName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const scenarioBlockMatch = scenariosContent.match(
              new RegExp(`['"]?${escapedName}['"]?\\s*:\\s*\\{([\\s\\S]*?)\\n    \\}`, 'm')
            );

            if (scenarioBlockMatch) {
              const scenarioBlock = scenarioBlockMatch[1];
              const status = scenarioBlock.match(/status:\s*(\d+)/)?.[1];
              const delay = scenarioBlock.match(/delay:\s*(\d+)/)?.[1];

              // Extract the data reference (e.g., userProfileCompleteMock)
              const dataMatch = scenarioBlock.match(/data:\s*(\w+)/);
              let responseData = null;

              if (dataMatch) {
                const mockName = dataMatch[1];
                responseData = loadMockData(mockName);
              }

              scenarios[scenarioName] = {
                status: parseInt(status || '200'),
                delay: parseInt(delay || '0'),
                data: responseData,
              };
            }
          }
        }

        if (id && name && method && urlPattern) {
          handlers.push({
            id,
            name,
            method,
            urlPattern,
            defaultScenario,
            scenarios,
          });
        }
      }
    }
  }

  return handlers;
}

/**
 * Infer JSON schema from data
 */
function inferSchema(data, name = 'object') {
  if (data === null || data === undefined) {
    return { type: 'null' };
  }

  if (Array.isArray(data)) {
    return {
      type: 'array',
      items: data.length > 0 ? inferSchema(data[0]) : { type: 'string' },
    };
  }

  if (typeof data === 'object') {
    const properties = {};
    for (const [key, value] of Object.entries(data)) {
      properties[key] = inferSchema(value, key);
    }
    return {
      type: 'object',
      properties,
    };
  }

  if (typeof data === 'string') {
    // Check if it's a timestamp placeholder
    if (data === '<timestamp>') {
      return { type: 'string', format: 'date-time' };
    }
    return { type: 'string' };
  }

  if (typeof data === 'number') {
    return Number.isInteger(data) ? { type: 'integer' } : { type: 'number' };
  }

  if (typeof data === 'boolean') {
    return { type: 'boolean' };
  }

  return { type: 'string' };
}

/**
 * Generate OpenAPI 3.0 specification from handlers
 */
function generateOpenAPISpec(handlers) {
  const paths = {};

  // Group handlers by path
  const handlersByPath = {};
  for (const handler of handlers) {
    if (!handlersByPath[handler.urlPattern]) {
      handlersByPath[handler.urlPattern] = [];
    }
    handlersByPath[handler.urlPattern].push(handler);
  }

  // Build paths
  for (const [path, pathHandlers] of Object.entries(handlersByPath)) {
    paths[path] = {};

    for (const handler of pathHandlers) {
      const method = handler.method.toLowerCase();
      const responses = {};

      // Build responses from scenarios
      const responsesByStatus = {};
      for (const [scenarioName, scenario] of Object.entries(handler.scenarios)) {
        const status = scenario.status.toString();

        if (!responsesByStatus[status]) {
          responsesByStatus[status] = {
            description: getStatusDescription(scenario.status),
            content: {
              'application/json': {
                schema: scenario.data ? inferSchema(scenario.data) : { type: 'object' },
                examples: {},
              },
            },
          };
        }

        // Add example for this scenario
        responsesByStatus[status].content['application/json'].examples[scenarioName] = {
          summary: scenarioName,
          value: scenario.data,
        };
      }

      paths[path][method] = {
        summary: handler.name,
        description: `${handler.name} endpoint`,
        operationId: handler.id,
        responses: responsesByStatus,
      };

      // Add request body for POST/PUT/PATCH methods
      if (['post', 'put', 'patch'].includes(method)) {
        // Try to infer request body from successful response
        const successScenario = Object.values(handler.scenarios).find(s => s.status === 200);
        if (successScenario && successScenario.data && successScenario.data.data) {
          paths[path][method].requestBody = {
            required: true,
            content: {
              'application/json': {
                schema: inferSchema(successScenario.data.data),
              },
            },
          };
        }
      }
    }
  }

  return {
    openapi: '3.0.0',
    info: {
      title: 'SweepSteak Mock API',
      version: '1.0.0',
      description: 'Mock API specification for SweepSteak mobile app development',
    },
    servers: [
      {
        url: process.env.EXPO_PUBLIC_BACKEND_URL || 'https://api.sweepsteak.com',
        description: 'Production server',
      },
    ],
    paths,
  };
}

/**
 * Get description for HTTP status code
 */
function getStatusDescription(status) {
  const descriptions = {
    200: 'Successful response',
    201: 'Created',
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    500: 'Internal server error',
  };
  return descriptions[status] || `Response with status ${status}`;
}

/**
 * Generate simplified mock documentation from handlers
 */
function generateMockDocs(handlers) {
  return {
    title: 'SweepSteak Mock API Documentation',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    endpoints: handlers.map(handler => ({
      id: handler.id,
      name: handler.name,
      method: handler.method,
      path: handler.urlPattern,
      description: `${handler.name} endpoint`,
      defaultScenario: handler.defaultScenario,
      scenarios: Object.entries(handler.scenarios).map(([name, scenario]) => ({
        name,
        status: scenario.status,
        delay: `${scenario.delay}ms`,
        response: scenario.data,
      })),
    })),
  };
}

/**
 * Main export function
 */
function exportMocks() {
  const handlers = loadHandlers();

  if (handlers.length === 0) {
    console.error('❌ No handlers found');
    return false;
  }

  const outputDir = path.join(__dirname, '../docs/mocks');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read existing files to check for changes
  const openApiPath = path.join(outputDir, 'openapi.json');
  const mockDocsPath = path.join(outputDir, 'mock-documentation.json');
  const readmePath = path.join(outputDir, 'README.md');

  const oldOpenApi = fs.existsSync(openApiPath) ? fs.readFileSync(openApiPath, 'utf-8') : '';
  const oldMockDocs = fs.existsSync(mockDocsPath) ? fs.readFileSync(mockDocsPath, 'utf-8') : '';

  // Generate new content
  const openApiSpec = generateOpenAPISpec(handlers);
  const newOpenApi = JSON.stringify(openApiSpec, null, 2);

  // Check if OpenAPI changed
  const openApiChanged = oldOpenApi !== newOpenApi;

  // Check if mock docs changed (excluding timestamps)
  let mockDocsChanged = false;
  let newMockDocs;
  let existingTimestamp = new Date().toISOString();

  try {
    const oldMockDocsObj = oldMockDocs ? JSON.parse(oldMockDocs) : null;

    if (oldMockDocsObj) {
      // Preserve existing timestamp
      existingTimestamp = oldMockDocsObj.generatedAt || existingTimestamp;

      // Generate new docs and compare without timestamp
      const mockDocsWithoutTime = generateMockDocs(handlers);
      const oldWithoutTime = { ...oldMockDocsObj };
      delete oldWithoutTime.generatedAt;
      delete mockDocsWithoutTime.generatedAt;

      mockDocsChanged = JSON.stringify(oldWithoutTime) !== JSON.stringify(mockDocsWithoutTime);

      // If changed, use new timestamp; if unchanged, use old timestamp
      const mockDocsObj = generateMockDocs(handlers);
      mockDocsObj.generatedAt = mockDocsChanged ? new Date().toISOString() : existingTimestamp;
      newMockDocs = JSON.stringify(mockDocsObj, null, 2);
    } else {
      const mockDocsObj = generateMockDocs(handlers);
      newMockDocs = JSON.stringify(mockDocsObj, null, 2);
      mockDocsChanged = true;
    }
  } catch (e) {
    const mockDocsObj = generateMockDocs(handlers);
    newMockDocs = JSON.stringify(mockDocsObj, null, 2);
    mockDocsChanged = true;
  }

  // Only write files if there are changes
  if (openApiChanged || mockDocsChanged) {
    fs.writeFileSync(openApiPath, newOpenApi);
    fs.writeFileSync(mockDocsPath, newMockDocs);

    const mockDocsObj = JSON.parse(newMockDocs);
    const readme = `# SweepSteak Mock API Documentation

Generated: ${mockDocsObj.generatedAt}

## Files

- **openapi.json** - OpenAPI 3.0 specification (import into Swagger UI, Postman, etc.)
- **mock-documentation.json** - Simplified documentation with all scenarios and response data

## Using OpenAPI Spec

Import \`openapi.json\` into:
- **Swagger UI**: View and test the API
- **Postman**: Generate collections
- **Backend Tools**: Validate implementation against contract

## Endpoints

${mockDocsObj.endpoints.map(endpoint => `
### ${endpoint.method} ${endpoint.path}
**${endpoint.name}**

${endpoint.description}

**Default Scenario:** ${endpoint.defaultScenario || 'None'}

**Scenarios:** ${endpoint.scenarios.length}
${endpoint.scenarios.map(s => `- ${s.name} (${s.status}) - ${s.delay}`).join('\n')}
`).join('\n')}

## Sharing with Backend Team

Share the \`openapi.json\` with your backend team so they can:
- Import it into their API development tools
- Use it as a contract for API implementation
- Validate their implementation against the spec
- See all mock scenarios and expected responses
`;

    fs.writeFileSync(readmePath, readme);

    console.log('📝 Mock API documentation updated');
    return true;
  } else {
    console.log('✅ Mock API documentation unchanged');
    return false;
  }
}

// Run the export
exportMocks();
