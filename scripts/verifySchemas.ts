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

interface SchemaInfo {
  properties: Set<string>;
  endpoints: Set<string>;
}

function extractSchemasFromPaths(spec: any): Record<string, SchemaInfo> {
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

          const pathParts = path.split('/').filter(Boolean);
          if (pathParts.length >= 2 && pathParts[0] === 'api') {
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

            // Extract properties from schema
            let itemSchema: OpenAPISchema | undefined;
            if (schema.properties?.data?.type === 'array' && schema.properties.data.items) {
              itemSchema = schema.properties.data.items;
            } else if (schema.type === 'object' && schema.properties) {
              itemSchema = schema;
            }

            if (itemSchema?.properties) {
              if (!schemas[schemaName]) {
                schemas[schemaName] = { properties: new Set(), endpoints: new Set() };
              }
              Object.keys(itemSchema.properties).forEach((prop) =>
                schemas[schemaName].properties.add(prop),
              );
              schemas[schemaName].endpoints.add(`${method.toUpperCase()} ${path}`);
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
    const errors: Array<{
      schemaName: string;
      added: string[];
      removed: string[];
      endpoints: Set<string>;
    }> = [];

    for (const schemaName of Object.keys(apiSchemas)) {
      const apiInfo = apiSchemas[schemaName];
      const fileProps = fileSchemas[schemaName] || new Set();

      const added = [...apiInfo.properties].filter((p) => !fileProps.has(p));
      const removed = [...fileProps].filter((p) => !apiInfo.properties.has(p));

      if (added.length > 0 || removed.length > 0) {
        hasErrors = true;
        errors.push({
          schemaName,
          added,
          removed,
          endpoints: apiInfo.endpoints,
        });
      }
    }

    if (!hasErrors) {
      console.log('✅ All schemas are up to date!\n');
      process.exit(0);
    } else {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ SCHEMA MISMATCH DETECTED');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      errors.forEach(({ schemaName, added, removed, endpoints }, index) => {
        console.error(
          `${index + 1}. Schema: ${schemaName}Schema (${schemaName.toLowerCase()}Schema in code)`,
        );
        console.error(`   Location: src/services/apis/schemas.ts`);
        console.error(`   Affected API endpoints:`);
        endpoints.forEach((endpoint) => {
          console.error(`     • ${endpoint}`);
        });
        console.error('');

        if (added.length > 0) {
          console.error(`   📥 NEW fields in API (need to add to schema):`);
          added.sort().forEach((field) => {
            console.error(`      + ${field}`);
          });
          console.error('');
        }

        if (removed.length > 0) {
          console.error(`   📤 REMOVED fields (exist in schema but not in API):`);
          removed.sort().forEach((field) => {
            console.error(`      - ${field}`);
          });
          console.error('');
        }

        if (index < errors.length - 1) {
          console.error('   ─────────────────────────────────────────────────────\n');
        }
      });

      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('💡 TO FIX: Run the following command to auto-update schemas:');
      console.error('   yarn generate-schemas');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('⚠️  Failed to fetch OpenAPI spec (API may be unavailable)');
    console.error('⚠️  Allowing commit to proceed...\n');
    // Exit code 2 indicates fetch failure (allow commit)
    process.exit(2);
  }
}

verifySchemas();
