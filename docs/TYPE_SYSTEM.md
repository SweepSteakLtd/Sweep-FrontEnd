# Type System Guidelines

This document explains how types are organized in the project and how to use them correctly.

## Auto-Generated Types from API

All API response types are **auto-generated from the OpenAPI specification** and should NOT be manually edited.

### Source of Truth

**Location**: `src/services/apis/schemas.ts` (AUTO-GENERATED - DO NOT EDIT)

This file contains:
- Zod validation schemas for all API models
- TypeScript types inferred from these schemas
- Response wrapper types for list endpoints

**Generated types:**
- `User`, `UserSchema`, `UsersResponse`
- `Tournament`, `TournamentSchema`, `TournamentsResponse`
- `Game`, `GameSchema`, `GamesResponse`
- `Bet`, `BetSchema`, `BetsResponse`

### How to Use API Types

#### ✅ CORRECT - Import from centralized location

```typescript
// Import from the domain-specific types file (which re-exports from schemas)
import type { Tournament } from '~/services/apis/Tournament/types';
import type { Game } from '~/services/apis/Game/types';
import type { User } from '~/services/apis/User/types';

// Or directly from schemas
import type { Tournament } from '~/services/apis/schemas';
```

#### ❌ WRONG - Do not create duplicate types

```typescript
// DON'T DO THIS - duplicates auto-generated types
interface Tournament {
  id: string;
  name: string;
  // ...
}

// DON'T DO THIS - creates manual types for API data
type Game = {
  id: string;
  name: string;
  // ...
};
```

## Domain-Specific Type Files

Each API domain has a types file that:
1. Re-exports the auto-generated types from `schemas.ts`
2. Defines **supplementary types** not in the OpenAPI spec yet

**Example**: `src/services/apis/Game/types.ts`

```typescript
// Re-export auto-generated types
export type { Game, GamesResponse } from '../schemas';

// Define supplementary types not in OpenAPI spec
export interface CreateGameRequest {
  name: string;
  entry_fee: number;
  // ...
}

export interface GameReward {
  rank: number;
  amount: number;
}
```

## When to Create Custom Types

### ✅ Create custom types for:

1. **Component Props**
   ```typescript
   interface GameCardProps {
     game: Game; // Uses auto-generated type
     onPress: () => void;
   }
   ```

2. **UI State**
   ```typescript
   interface FormState {
     loading: boolean;
     errors: Record<string, string>;
   }
   ```

3. **Request Bodies Not Yet in OpenAPI**
   ```typescript
   // In src/services/apis/Game/types.ts
   export interface CreateGameRequest {
     name: string;
     entry_fee: number;
   }
   ```

4. **Domain Logic Types**
   ```typescript
   type GameStatus = 'pending' | 'active' | 'completed';
   ```

### ❌ Do NOT create custom types for:

1. **API Response Data** - Use auto-generated types
2. **Data Models** - Use auto-generated types
3. **Properties from API** - Use auto-generated types

## Validation with Zod Schemas

When validating API responses, use the auto-generated schemas:

```typescript
import { tournamentsResponseSchema } from '~/services/apis/schemas';

const response = await fetch('/api/tournaments');
const data = await response.json();

// Validate with Zod schema
const result = tournamentsResponseSchema.safeParse(data);

if (result.success) {
  // data is now typed as TournamentsResponse
  const tournaments = result.data.data;
}
```

## Type Safety Workflow

1. **Backend updates API** → Properties change in OpenAPI spec
2. **Run `yarn generate-schemas`** → Updates `schemas.ts`
3. **TypeScript errors appear** → Shows where code needs updating
4. **Update components** → Fix type errors, rename properties
5. **Commit** → Pre-commit hook verifies schemas are in sync

## Benefits

✅ **Single source of truth** - Types come from OpenAPI spec
✅ **Type safety** - Frontend types guaranteed to match backend
✅ **Auto validation** - Zod schemas validate API responses
✅ **No duplication** - One type definition per model
✅ **Easy refactoring** - Type errors guide you when API changes

## Common Patterns

### Using API Types in Components

```typescript
import type { Tournament } from '~/services/apis/schemas';

interface TournamentCardProps {
  tournament: Tournament; // Auto-generated type
  onPress: () => void;
}

export const TournamentCard = ({ tournament }: TournamentCardProps) => {
  // All tournament properties are typed
  return <Card title={tournament.name} />;
};
```

### Using Types in Hooks

```typescript
import { tournamentsResponseSchema } from '~/services/apis/schemas';
import type { Tournament } from '~/services/apis/schemas';

export const useGetTournaments = () => {
  return useQuery({
    queryFn: async (): Promise<Tournament[]> => {
      const response = await fetch('/api/tournaments');
      const data = await response.json();

      // Validate with Zod
      const result = tournamentsResponseSchema.safeParse(data);

      if (!result.success) {
        throw new Error('Invalid tournament data');
      }

      return result.data.data;
    },
  });
};
```

## Migration Checklist

When backend API changes:

- [ ] Run `yarn generate-schemas`
- [ ] Check TypeScript errors: `yarn type-check`
- [ ] Update imports if schema names changed
- [ ] Update property usage if property names changed
- [ ] Test validation still works
- [ ] Commit updated schemas

## Questions?

- **Where do types come from?** Auto-generated from OpenAPI spec
- **Can I edit schemas.ts?** No, it's auto-generated
- **Where do I add new types?** In domain-specific types files (e.g., `Game/types.ts`)
- **How do I update API types?** Run `yarn generate-schemas` after backend changes
- **What if I need a custom type?** Add it to the appropriate domain types file
