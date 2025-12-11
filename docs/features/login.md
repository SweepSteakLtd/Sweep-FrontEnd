# Login Flow Documentation

This document describes the authentication and login flow in the SweepSteak app.

## Overview

The login flow uses Firebase Authentication combined with a backend profile check to determine user state and routing.

## Flow Diagram

```
┌─────────────────┐
│   Login Screen  │
│                 │
│  Email/Password │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Firebase     │
│ Authentication  │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Success │
    └────┬────┘
         │
         ▼
┌─────────────────┐
│  GET /api/users │
│       /me       │
└────────┬────────┘
         │
    ┌────┴────────────────────────────┐
    │                                 │
    ▼                                 ▼
┌─────────┐                    ┌────────────┐
│   200   │                    │    404     │
│ Profile │                    │ No Profile │
│ Exists  │                    │            │
└────┬────┘                    └─────┬──────┘
     │                               │
     ▼                               ▼
┌──────────────┐              ┌──────────────┐
│ Check        │              │ Terms &      │
│ is_identity_ │              │ Conditions   │
│ verified     │              └──────┬───────┘
└──────┬───────┘                     │
       │                             ▼
  ┌────┴────┐                 ┌──────────────┐
  │         │                 │ Create       │
  ▼         ▼                 │ Profile      │
┌────┐   ┌───────┐            └──────────────┘
│true│   │ false │
└─┬──┘   └───┬───┘
  │          │
  ▼          ▼
┌────────┐ ┌──────────────┐
│T&C then│ │ Verification │
│Dashboard│ │   Pending    │
└────────┘ └──────────────┘
```

## Components

### Login Screen

**Location:** `src/features/authentication/screens/Login/Login.tsx`

The login screen provides:
- Email input field
- Password input field (secure)
- Sign In button
- Create Account link
- Dev Mock Button (development only)

### useLogin Hook

**Location:** `src/features/authentication/hooks/useLogin.ts`

The hook handles:
1. Firebase authentication
2. Profile existence check
3. Verification status check
4. Error handling and display

```typescript
export type LoginResult =
  | { success: true; profileComplete: true; isVerified: boolean }
  | { success: true; profileComplete: false }
  | { success: false; error: string };
```

## Authentication Steps

### Step 1: Firebase Authentication

```typescript
const userCredential = await signInWithEmailAndPassword(
  firebaseAuth,
  email,
  password
);
```

Firebase validates credentials and returns a user token.

### Step 2: Profile Check

```typescript
const { data: userData } = await refetchUser();
// Calls GET /api/users/me with Firebase auth token
```

The API returns:
- **200**: Profile exists with user data
- **404**: No profile (new user)
- **500**: Server error

### Step 3: Routing Decision

Based on the response:

| Condition | Navigation |
|-----------|------------|
| Profile exists + verified | Terms & Conditions → Dashboard |
| Profile exists + unverified | Verification Pending |
| No profile (404) | Terms & Conditions → Create Profile |
| Server error | Show error, sign out |

## API Endpoints

### GET /api/users/me

Returns the current user's profile.

**Response (200):**
```json
{
  "data": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_identity_verified": true,
    "phone_number": "+44123456789",
    "date_of_birth": "1990-01-15",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Response (404):**
```json
{
  "error": "User profile not found"
}
```

## Validation

Login form validation uses Zod:

**Location:** `src/features/authentication/screens/Login/validation.ts`

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
```

## Error Handling

### Firebase Auth Errors

**Location:** `src/features/authentication/hooks/utils/authErrors.ts`

Common errors:
- `auth/invalid-email` - Invalid email format
- `auth/user-not-found` - No account exists
- `auth/wrong-password` - Incorrect password
- `auth/too-many-requests` - Rate limited

### API Errors

If the profile check fails (500 error):
1. Display error message to user
2. Sign out from Firebase
3. User remains on login screen

## Mock Scenarios

For testing, use the Dev Mock Button to configure:

| Scenario | Status | Result |
|----------|--------|--------|
| Complete Profile | 200 | Dashboard route |
| Unverified Profile | 200 | Verification Pending |
| No Profile (404) | 404 | Create Profile |
| Server Error (500) | 500 | Error shown |

See `src/lib/mocks/handlers/userHandler.ts` for mock configuration.

## State Management

### Auth Context

**Location:** `src/contexts/AuthContext.tsx`

Provides:
- `user` - Firebase user object
- `loading` - Auth state loading
- `signOut` - Sign out function

### TanStack Query

User profile data is managed with TanStack Query:

```typescript
// src/services/apis/User/useGetUser.ts
export const userQueryKeys = {
  user: ['user'] as const,
};

export const useGetUser = (enabled = true) => {
  return useQuery({
    queryKey: userQueryKeys.user,
    queryFn: fetchUser,
    enabled: enabled && !!firebaseAuth.currentUser,
  });
};
```

## Security Considerations

1. **Password Storage**: Passwords are never stored locally; Firebase handles authentication
2. **Token Refresh**: Firebase automatically refreshes auth tokens
3. **Secure Input**: Password field uses `secureTextEntry`
4. **Error Messages**: Generic error messages to prevent user enumeration

## Testing the Login Flow

### With Real Backend

1. Create a Firebase account
2. Complete profile creation
3. Test login with credentials

### With Mocks

1. Enable mocks via Dev Mock Button
2. Enable "Get User Profile" handler
3. Select desired scenario:
   - "Complete Profile" for verified user
   - "Unverified Profile" for pending verification
   - "No Profile (404)" for new user flow
4. Enter any email/password (Firebase is bypassed when mocks are active for the user endpoint)

## Related Files

- `src/features/authentication/screens/Login/Login.tsx` - Login UI
- `src/features/authentication/screens/Login/styles.ts` - Styled components
- `src/features/authentication/screens/Login/validation.ts` - Zod schema
- `src/features/authentication/hooks/useLogin.ts` - Login logic
- `src/features/authentication/hooks/utils/authErrors.ts` - Error messages
- `src/features/authentication/mocks.ts` - Mock data
- `src/lib/mocks/handlers/userHandler.ts` - Mock handlers
- `src/services/apis/User/useGetUser.ts` - User API hook
