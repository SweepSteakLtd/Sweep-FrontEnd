#!/usr/bin/env tsx
/**
 * Script to generate Zod schemas from OpenAPI/Swagger specification
 *
 * Usage:
 *   yarn generate-schemas
 *
 * This will:
 * 1. Fetch the latest OpenAPI spec from the backend
 * 2. Generate Zod schemas automatically with relaxed validation
 * 3. Update src/services/apis/schemas.ts
 */

import fs from 'fs/promises';
import path from 'path';

const OPENAPI_URL =
  'https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/openapi.json';
const OUTPUT_PATH =
  process.env.SCHEMA_OUTPUT_PATH || path.join(process.cwd(), 'src/services/apis/schemas.ts');

interface OpenAPISchema {
  type?: string;
  properties?: Record<string, any>;
  required?: string[];
  items?: any;
  additionalProperties?: any;
}

function convertToZod(schema: OpenAPISchema, name: string, required: boolean = true): string {
  if (!schema.type) {
    return 'z.unknown()';
  }

  let zodType = '';

  switch (schema.type) {
    case 'string':
      zodType = 'z.string()';
      break;
    case 'number':
    case 'integer':
      zodType = 'z.number()';
      break;
    case 'boolean':
      zodType = 'z.boolean()';
      break;
    case 'array':
      if (schema.items) {
        const itemType = convertToZod(schema.items, `${name}Item`, true);
        zodType = `z.array(${itemType})`;
      } else {
        zodType = 'z.array(z.unknown())';
      }
      break;
    case 'object':
      if (schema.additionalProperties) {
        const valueType = convertToZod(schema.additionalProperties, `${name}Value`, true);
        zodType = `z.record(${valueType})`;
      } else {
        zodType = 'z.object({})';
      }
      break;
    default:
      zodType = 'z.unknown()';
  }

  // Make non-required fields optional with defaults for arrays
  if (!required) {
    if (schema.type === 'array') {
      zodType += '.optional().default([])';
    } else {
      zodType += '.optional()';
    }
  }

  return zodType;
}

function extractSchemasFromPaths(spec: any): Record<string, OpenAPISchema> {
  const schemas: Record<string, OpenAPISchema> = {};
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

          // Extract schema name from path
          // Handle both /api/resource and /api/admin/resource patterns
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

            // Handle list responses (200 responses often wrap data in a "data" array)
            if (schema.properties?.data?.type === 'array' && schema.properties.data.items) {
              const itemSchema = schema.properties.data.items;
              // Make all array fields optional with default []
              if (itemSchema.properties) {
                for (const [propName, propSchema] of Object.entries(itemSchema.properties)) {
                  const prop = propSchema as OpenAPISchema;
                  if (prop.type === 'array') {
                    // Mark arrays as not required so they become optional
                    itemSchema.required =
                      itemSchema.required?.filter((r: string) => r !== propName) || [];
                  }
                }
              }
              schemas[schemaName] = itemSchema;
            } else if (schema.type === 'object' && schema.properties) {
              // Make all array fields optional with default []
              if (schema.properties) {
                for (const [propName, propSchema] of Object.entries(schema.properties)) {
                  const prop = propSchema as OpenAPISchema;
                  if (prop.type === 'array') {
                    schema.required = schema.required?.filter((r: string) => r !== propName) || [];
                  }
                }
              }
              schemas[schemaName] = schema;
            }
          }
        }
      }
    }
  }

  return schemas;
}

async function generateSchemas() {
  console.log('📥 Fetching OpenAPI specification...');

  try {
    const response = await fetch(OPENAPI_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
    }

    const spec = await response.json();
    console.log('✅ OpenAPI spec fetched successfully\n');

    // Extract schemas from paths since they're not in components.schemas
    const schemas = extractSchemasFromPaths(spec);
    console.log(`📊 Found ${Object.keys(schemas).length} schemas in OpenAPI spec`);
    console.log(`📋 Schema names: ${Object.keys(schemas).join(', ')}\n`);

    let output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 *
 * This file is automatically generated from the OpenAPI specification.
 * To regenerate, run: yarn generate-schemas
 *
 * Source: ${OPENAPI_URL}
 * Generated: ${new Date().toISOString()}
 *
 * Note: Schemas are intentionally relaxed (optional fields, flexible types)
 * to handle real-world API responses gracefully.
 */

import { z } from 'zod';

`;

    // Generate schemas for each component
    let schemasGenerated = 0;
    for (const [schemaName, schemaData] of Object.entries(schemas)) {
      const schema = schemaData as OpenAPISchema;

      console.log(`Processing: ${schemaName} (type: ${schema.type})`);

      if (schema.type === 'object' && schema.properties) {
        const requiredFields = schema.required || [];

        output += `// ${schemaName}\n`;
        output += `export const ${schemaName.charAt(0).toLowerCase() + schemaName.slice(1)}Schema = z.object({\n`;

        for (const [propName, propSchema] of Object.entries(schema.properties)) {
          const isRequired = requiredFields.includes(propName);
          const zodType = convertToZod(propSchema as OpenAPISchema, propName, isRequired);
          output += `  ${propName}: ${zodType},\n`;
        }

        output += `});\n\n`;
        output += `export type ${schemaName} = z.infer<typeof ${schemaName.charAt(0).toLowerCase() + schemaName.slice(1)}Schema>;\n\n`;
        schemasGenerated++;
      } else {
        console.log(`⚠️  Skipping ${schemaName}: not an object with properties`);
      }
    }

    // Generate response wrapper schemas for list endpoints
    output += `// API Response Wrappers\n`;
    for (const schemaName of Object.keys(schemas)) {
      const pluralName = schemaName.toLowerCase() + 's';
      output += `export const ${pluralName}ResponseSchema = z.object({\n`;
      output += `  data: z.array(${schemaName.charAt(0).toLowerCase() + schemaName.slice(1)}Schema),\n`;
      output += `});\n\n`;
      output += `export type ${schemaName}sResponse = z.infer<typeof ${pluralName}ResponseSchema>;\n\n`;
    }

    console.log(`\n✅ Generated ${schemasGenerated} schemas\n`);

    await fs.writeFile(OUTPUT_PATH, output);

    console.log('✅ Zod schemas generated successfully!');
    console.log(`📝 Output: ${OUTPUT_PATH}\n`);
    console.log('✨ Schema generation complete!');
  } catch (error) {
    console.error('❌ Error generating schemas:', error);
    process.exit(1);
  }
}

generateSchemas();
