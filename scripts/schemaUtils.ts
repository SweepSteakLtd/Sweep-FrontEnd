/**
 * Shared utilities for schema generation and verification
 *
 * This module contains common logic used by both generateSchemas.ts and verifySchemas.ts
 * to ensure they always use the same schema extraction logic.
 */

export const OPENAPI_URL = 'http://localhost:8080/openapi.json';

export interface OpenAPISchema {
  type?: string;
  properties?: Record<string, any>;
  required?: string[];
  items?: any;
  additionalProperties?: any;
}

export interface SchemaInfo {
  properties: Record<string, any>;
  endpoints: Set<string>;
}

/**
 * Extract schema name from API path
 * Handles both /api/resource and /api/admin/resource patterns
 */
export function extractSchemaName(path: string): string | null {
  const pathParts = path.split('/').filter(Boolean);
  if (pathParts.length < 2 || pathParts[0] !== 'api') {
    return null;
  }

  // For admin endpoints like /api/admin/player-profiles, use the resource after 'admin'
  // For regular endpoints like /api/users, use pathParts[1]
  let resourceName: string;
  if (pathParts[1] === 'admin' && pathParts.length >= 3) {
    resourceName = pathParts[2];
  } else {
    resourceName = pathParts[1];
  }

  // Convert to PascalCase and singularize
  // player-profiles -> PlayerProfile, users -> User, games -> Game
  let schemaName = resourceName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // Remove trailing 's' if it's there (but not for 'ss' endings)
  if (schemaName.endsWith('s') && !schemaName.endsWith('ss')) {
    schemaName = schemaName.slice(0, -1);
  }

  return schemaName;
}

/**
 * Extract schema properties from a response schema
 * Handles both array responses (with data wrapper) and object responses
 */
export function extractProperties(schema: any): Record<string, any> | null {
  // Handle list responses (200 responses often wrap data in a "data" array)
  if (schema.properties?.data?.type === 'array' && schema.properties.data.items) {
    return schema.properties.data.items.properties || null;
  }
  // Handle single object responses wrapped in a "data" property
  else if (
    schema.type === 'object' &&
    schema.properties?.data?.type === 'object' &&
    schema.properties.data.properties
  ) {
    return schema.properties.data.properties;
  }
  // Handle unwrapped single object responses
  else if (schema.type === 'object' && schema.properties) {
    return schema.properties;
  }
  return null;
}

/**
 * Extract all schemas from OpenAPI paths
 * Aggregates properties from ALL endpoints for each schema type
 *
 * This is the core logic shared between generation and verification
 */
export function extractSchemasFromPaths(spec: any): Record<string, SchemaInfo> {
  const schemas: Record<string, SchemaInfo> = {};
  const paths = spec.paths || {};

  for (const [path, pathData] of Object.entries(paths as Record<string, any>)) {
    for (const [method, methodData] of Object.entries(pathData as Record<string, any>)) {
      if (typeof methodData !== 'object' || !methodData.responses) continue;

      for (const [statusCode, response] of Object.entries(
        methodData.responses as Record<string, any>,
      )) {
        if (
          (statusCode === '200' || statusCode === '201') &&
          response.content?.['application/json']?.schema
        ) {
          const schema = response.content['application/json'].schema;
          const schemaName = extractSchemaName(path);

          if (!schemaName) continue;

          const properties = extractProperties(schema);
          if (!properties) continue;

          // Initialize schema info if this is the first time we've seen this schema
          if (!schemas[schemaName]) {
            schemas[schemaName] = {
              properties: {},
              endpoints: new Set(),
            };
          }

          // Merge properties from this endpoint (aggregating across all endpoints)
          // Prioritize more complex types (objects with properties) over simple types
          for (const [propName, propSchema] of Object.entries(properties)) {
            const existing = schemas[schemaName].properties[propName];

            // If property doesn't exist yet, add it
            if (!existing) {
              schemas[schemaName].properties[propName] = propSchema;
              continue;
            }

            // If new schema is an object with properties and existing is not, prefer the new one
            if (
              propSchema.type === 'object' &&
              propSchema.properties &&
              Object.keys(propSchema.properties).length > 0
            ) {
              schemas[schemaName].properties[propName] = propSchema;
            }
            // Otherwise keep existing (first one wins, or more specific one if it was an object)
          }

          // Track which endpoint this came from
          schemas[schemaName].endpoints.add(`${method.toUpperCase()} ${path}`);
        }
      }
    }
  }

  return schemas;
}

/**
 * Fetch the OpenAPI specification from the backend
 */
export async function fetchOpenAPISpec(): Promise<any> {
  const response = await fetch(OPENAPI_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
  }
  return response.json();
}
