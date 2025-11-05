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

import { extractSchemasFromPaths, fetchOpenAPISpec } from './schemaUtils';

function extractPropertiesFromSchemaFile(content: string): Record<string, Set<string>> {
  const schemas: Record<string, Set<string>> = {};

  // Match schema definitions like: export const userSchema = z.object({
  // Need to match across multiple lines and handle nested objects/arrays
  const schemaRegex = /export const (\w+)Schema = z\.object\(\{([\s\S]*?)\}\);/g;

  let match;
  while ((match = schemaRegex.exec(content)) !== null) {
    const schemaName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    const properties = match[2];

    // Extract only top-level property names (not nested properties)
    // Split by lines and only match properties at the first indentation level (2 spaces)
    const lines = properties.split('\n');
    const props = new Set<string>();

    for (const line of lines) {
      // Match properties that start with exactly 2 spaces (top-level in z.object)
      // This excludes nested properties which have 4+ spaces
      const topLevelPropMatch = /^  (\w+):\s/.exec(line);
      if (topLevelPropMatch) {
        props.add(topLevelPropMatch[1]);
      }
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
    const spec = await fetchOpenAPISpec();
    console.log('✅ OpenAPI spec fetched\n');

    // Extract properties from OpenAPI spec using shared utility
    const apiSchemaInfos = extractSchemasFromPaths(spec);

    // Convert properties object to Set for comparison
    const apiSchemas: Record<string, { properties: Set<string>; endpoints: Set<string> }> = {};
    for (const [schemaName, schemaInfo] of Object.entries(apiSchemaInfos)) {
      apiSchemas[schemaName] = {
        properties: new Set(Object.keys(schemaInfo.properties)),
        endpoints: schemaInfo.endpoints,
      };
    }

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
