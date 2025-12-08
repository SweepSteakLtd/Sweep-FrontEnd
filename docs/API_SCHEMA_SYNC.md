# API Schema Synchronization

This project uses automated schema generation to keep frontend types in sync with the backend OpenAPI specification.

## Overview

Instead of manually writing and maintaining Zod schemas and TypeScript types, we automatically generate them from the backend's OpenAPI/Swagger specification. This ensures:

- ✅ Type safety between frontend and backend
- ✅ Automatic validation of API responses
- ✅ No manual schema maintenance
- ✅ Early detection of API changes
- ✅ Always up-to-date types

## Commands

### Generate Schemas

Generate Zod schemas from the latest OpenAPI spec:

```bash
yarn generate-schemas
```

This will:
1. Fetch the latest OpenAPI spec from the backend
2. Generate Zod schemas automatically
3. Update `src/services/apis/schemas.ts`

**When to run:**
- After backend API changes
- When adding new endpoints
- When updating existing endpoint schemas

### Verify Schemas

Check if schema properties match the OpenAPI spec:

```bash
yarn verify-schemas
```

This will:
1. Fetch the latest OpenAPI spec
2. Extract property names from API responses
3. Compare with properties in current schemas
4. Report any added or missing properties

**When to run:**
- Before committing code (done automatically via pre-commit hook)
- In CI/CD pipelines
- When debugging type mismatches

**Example output:**
```
❌ User schema mismatch:
   Added in API: avatar_url, verified_at
   Missing in schema: profile_url

To fix these issues, run:
  yarn generate-schemas
```

## Pre-Commit Hook

A pre-commit hook automatically verifies that schemas are in sync before each commit. If schemas are out of sync:

1. The commit will be blocked
2. You'll see an error message
3. Run `yarn generate-schemas` to fix
4. Review the changes
5. Commit again

## Workflow

### When Backend API Changes

1. Backend team updates the OpenAPI spec
2. Frontend developer runs `yarn generate-schemas`
3. Review the generated schema changes
4. Update components/hooks to use new types if needed
5. Commit the updated schemas

### Example

```bash
# Backend added a new field to User model
yarn generate-schemas

# Review changes
git diff src/services/apis/schemas.ts

# If changes look good, commit
git add src/services/apis/schemas.ts
git commit -m "Update schemas for new User.avatar field"
```

## Files

- `scripts/generateSchemas.ts` - Schema generation script
- `scripts/verifySchemas.ts` - Schema verification script
- `src/services/apis/schemas.ts` - Auto-generated Zod schemas (DO NOT EDIT MANUALLY)
- `.husky/pre-commit` - Pre-commit hook that runs verification

## Troubleshooting

### Schema verification fails

```bash
# Regenerate schemas
yarn generate-schemas

# Review changes carefully
git diff src/services/apis/schemas.ts

# If changes are expected (backend API updated), commit them
# If changes are unexpected, investigate backend API
```

### Generated schemas look wrong

1. Check that OpenAPI spec URL is correct in `scripts/generateSchemas.ts`
2. Verify backend OpenAPI spec is valid: https://sweepsteak-production--sweepsteak-64dd0.europe-west4.hosted.app/swaggerui/
3. Check for any custom configuration in generation script

### Type errors after regeneration

1. Generated types changed - update component/hook imports
2. Property names changed - update component code to use new names
3. Required fields added - ensure you're providing them in requests

## Benefits

### Before (Manual)
- ❌ Manually write Zod schemas
- ❌ Manually keep TypeScript types in sync
- ❌ Easy to miss API changes
- ❌ Risk of type/API mismatch
- ❌ Time-consuming maintenance

### After (Automated)
- ✅ Schemas auto-generated from source of truth
- ✅ TypeScript types derived from schemas
- ✅ API changes caught immediately
- ✅ Guaranteed type/API match
- ✅ Zero maintenance overhead

## CI/CD Integration

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Verify API Schemas
  run: yarn verify-schemas
```

This ensures pull requests can't be merged with out-of-sync schemas.
