#!/usr/bin/env tsx
/**
 * Script to verify that schemas match the OpenAPI specification
 *
 * Usage:
 *   yarn verify-schemas
 *
 * This script:
 * 1. Fetches the latest OpenAPI spec
 * 2. Extracts property names from API responses
 * 3. Compares with properties in current schemas
 * 4. Reports any differences (added, removed, or changed properties)
 *
 * Useful for:
 * - Pre-commit hooks
 * - CI/CD pipelines
 * - Manual verification
 */

const OPENAPI_URL =
  'https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json';

interface OpenAPISchema {
  type?: string;
  properties?: Record<string, any>;
  required?: string[];
}

function extractSchemasFromPaths(spec: any): Record<string, Set<string>> {
  const schemas: Record<string, Set<string>> = {};
  const paths = spec.paths || {};

  for (const [path, pathData] of Object.entries(paths as Record<string, any>)) {
    for (const [, methodData] of Object.entries(pathData as Record<string, any>)) {
      if (typeof methodData !== 'object' || !methodData.responses) continue;

      for (const [statusCode, response] of Object.entries(
        methodData.responses as Record<string, any>,
      )) {
        if (
          (statusCode === '200' || statusCode === '201') &&
          response.content?.['application/json']?.schema
        ) {
          const schema = response.content['application/json'].schema;

          const pathParts = path.split('/').filter(Boolean);
          if (pathParts.length >= 2 && pathParts[0] === 'api') {
            const resourceName = pathParts[1];
            let schemaName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
            if (schemaName.endsWith('s')) {
              schemaName = schemaName.slice(0, -1);
            }

            // Extract properties from schema
            let itemSchema: OpenAPISchema | undefined;
            if (schema.properties?.data?.type === 'array' && schema.properties.data.items) {
              itemSchema = schema.properties.data.items;
            } else if (schema.type === 'object' && schema.properties) {
              itemSchema = schema;
            }

            if (itemSchema?.properties) {
              if (!schemas[schemaName]) {
                schemas[schemaName] = new Set();
              }
              Object.keys(itemSchema.properties).forEach((prop) => schemas[schemaName].add(prop));
            }
          }
        }
      }
    }
  }

  return schemas;
}

function extractPropertiesFromSchemaFile(content: string): Record<string, Set<string>> {
  const schemas: Record<string, Set<string>> = {};

  // Match schema definitions like: export const userSchema = z.object({
  // Need to match across multiple lines and handle nested objects/arrays
  const schemaRegex = /export const (\w+)Schema = z\.object\(\{([\s\S]*?)\}\);/g;

  let match;
  while ((match = schemaRegex.exec(content)) !== null) {
    const schemaName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    const properties = match[2];

    // Extract property names (property: type,)
    const propRegex = /^\s*(\w+):/gm;
    const props = new Set<string>();
    let propMatch;
    while ((propMatch = propRegex.exec(properties)) !== null) {
      props.add(propMatch[1]);
    }

    schemas[schemaName] = props;
  }

  return schemas;
}

async function verifySchemas() {
  console.log('🔍 Verifying API schemas are up to date...\n');

  try {
    // Fetch OpenAPI spec
    console.log('📥 Fetching OpenAPI specification...');
    const response = await fetch(OPENAPI_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
    }

    const spec = await response.json();
    console.log('✅ OpenAPI spec fetched\n');

    // Extract properties from OpenAPI spec
    const apiSchemas = extractSchemasFromPaths(spec);

    // Read current schema file
    const fs = await import('fs/promises');
    const path = await import('path');
    const schemaPath = path.join(process.cwd(), 'src/services/apis/schemas.ts');
    const currentContent = await fs.readFile(schemaPath, 'utf-8');

    // Extract properties from current schema file
    const fileSchemas = extractPropertiesFromSchemaFile(currentContent);

    // Compare schemas (only check schemas that exist in API, ignore response wrappers)
    let hasErrors = false;

    for (const schemaName of Object.keys(apiSchemas)) {
      const apiProps = apiSchemas[schemaName];
      const fileProps = fileSchemas[schemaName] || new Set();

      const added = [...apiProps].filter((p) => !fileProps.has(p));
      const removed = [...fileProps].filter((p) => !apiProps.has(p));

      if (added.length > 0 || removed.length > 0) {
        hasErrors = true;
        console.error(`❌ ${schemaName} schema mismatch:`);
        if (added.length > 0) {
          console.error(`   Added in API: ${added.join(', ')}`);
        }
        if (removed.length > 0) {
          console.error(`   Missing in schema: ${removed.join(', ')}`);
        }
        console.error('');
      }
    }

    if (!hasErrors) {
      console.log('✅ All schemas are up to date!\n');
      process.exit(0);
    } else {
      console.error('To fix these issues, run:');
      console.error('  yarn generate-schemas\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error verifying schemas:', error);
    process.exit(1);
  }
}

verifySchemas();
