# Create Profile Flow Documentation

This document describes the profile creation wizard in the SweepSteak app.

## Overview

The Create Profile flow is a 6-step wizard that collects user information required for account setup and regulatory compliance (KYC - Know Your Customer).

## Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        CREATE PROFILE WIZARD                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Step 1          Step 2           Step 3          Step 4         │
│  ┌─────────┐    ┌─────────────┐  ┌───────────┐  ┌─────────────┐ │
│  │ Basic   │───▶│ Phone       │─▶│ Verify    │─▶│ Personal    │ │
│  │ Info    │    │ Number      │  │ Code      │  │ Details     │ │
│  │         │    │             │  │           │  │             │ │
│  │ - First │    │ - Phone     │  │ - SMS     │  │ - DOB       │ │
│  │   Name  │    │   Entry     │  │   Code    │  │ - Address   │ │
│  │ - Middle│    │ - Country   │  │           │  │ - Postcode  │ │
│  │ - Last  │    │   Code      │  │           │  │             │ │
│  └─────────┘    └─────────────┘  └───────────┘  └─────────────┘ │
│                                                                   │
│  Step 5          Step 6                                          │
│  ┌─────────────┐  ┌─────────────┐                                │
│  │ Deposit     │─▶│ Stake       │───▶ Submit                     │
│  │ Limits      │  │ Limits      │                                │
│  │             │  │             │                                │
│  │ - Daily     │  │ - Betting   │                                │
│  │ - Weekly    │  │   Limit     │                                │
│  │ - Monthly   │  │             │                                │
│  └─────────────┘  └─────────────┘                                │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  POST /api/users │
                    │  Create Profile  │
                    └────────┬────────┘
                             │
                        ┌────┴────┐
                        │         │
                        ▼         ▼
                   ┌────────┐ ┌────────┐
                   │ Success│ │ Error  │
                   └───┬────┘ └───┬────┘
                       │          │
                       ▼          ▼
              ┌──────────────┐  ┌──────────┐
              │ GBG Verify   │  │ Show     │
              │ Polling      │  │ Error    │
              └──────┬───────┘  │ + Retry  │
                     │          └──────────┘
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌────────┐  ┌──────────┐  ┌────────┐
   │  PASS  │  │ IN_PROG  │  │ FAIL/  │
   │        │  │          │  │ MANUAL │
   └───┬────┘  └────┬─────┘  └───┬────┘
       │            │            │
       ▼            │            ▼
   ┌────────┐       │      ┌────────────┐
   │Success │       │      │Verification│
   │Screen  │  Keep polling│  Pending   │
   │   ↓    │       │      │  Screen    │
   │Dashboard│      │      └────────────┘
   └────────┘       │
```

## Components

### Main Screen

**Location:** `src/features/create-profile/screens/CreateProfile/CreateProfile.tsx`

The screen manages:
- Step navigation (Back/Next buttons)
- Progress indicator
- Step content rendering
- Loading/Success/Error states

### Form Hook

**Location:** `src/features/create-profile/hooks/useCreateProfileForm.ts`

Manages:
- Form state for all 6 steps
- Field validation (Zod schemas)
- Step navigation logic
- API submission
- GBG verification polling

## Step Components

### Step 1: Basic Info

**Component:** `BasicInfoStep.tsx`

Collects:
- First name (required)
- Middle names (optional)
- Last name (required)

**Validation:**
```typescript
export const basicInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});
```

### Step 2: Phone Number

**Component:** `PhoneNumberStep.tsx`

Features:
- Country code selector
- Phone number input
- Automatic formatting
- Send verification code button

The component sends an SMS verification code when "Next" is pressed.

### Step 3: Verification Code

**Component:** `VerificationCodeStep.tsx`

Features:
- 6-digit code input
- Auto-submit on complete
- Resend code option
- Error display

### Step 4: Personal Details

**Component:** `PersonalDetailsStep.tsx`

Collects:
- Date of birth (date picker)
- Address line 1 (required)
- Address line 2 (optional)
- Address line 3 (optional)
- City/Town (required)
- County (optional)
- Postcode (required)

**Features:**
- Address lookup by postcode
- Manual address entry fallback
- Age validation (18+)

### Step 5: Deposit Limits

**Component:** `DepositLimitStep.tsx`

Collects (all optional):
- Daily deposit limit (£)
- Weekly deposit limit (£)
- Monthly deposit limit (£)

### Step 6: Stake Limits

**Component:** `StakeLimitStep.tsx`

Collects (optional):
- Maximum betting limit per bet (£)

## Form Data Structure

```typescript
interface FormData {
  // Step 1: Basic Info
  firstName: string;
  middleNames: string;
  lastName: string;

  // Step 2 & 3: Phone Verification
  phoneNumber: string;
  verifiedPhoneNumber: string;
  phoneVerified: boolean;

  // Step 4: Personal Details
  dateOfBirth?: Date;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;

  // Step 5: Deposit Limits
  depositLimitDaily: string;
  depositLimitWeekly: string;
  depositLimitMonthly: string;

  // Step 6: Stake Limit
  bettingLimit: string;
}
```

## API Integration

### Create Profile Endpoint

**POST /api/users**

**Request Body:**
```json
{
  "first_name": "John",
  "middle_names": "William",
  "last_name": "Doe",
  "phone_number": "+447123456789",
  "date_of_birth": "1990-01-15",
  "address": {
    "line1": "123 Main Street",
    "line2": "Apartment 4B",
    "line3": null,
    "town": "London",
    "county": "Greater London",
    "postcode": "SW1A 1AA",
    "country": "GB"
  },
  "deposit_limit": {
    "daily": 5000,
    "weekly": 20000,
    "monthly": 50000
  },
  "betting_limit": 10000
}
```

**Note:** Monetary values are in pence (e.g., £50 = 5000 pence)

**Response (201):**
```json
{
  "data": {
    "id": "usr_abc123",
    "first_name": "John",
    "last_name": "Doe",
    "kyc_instance_id": "kyc_xyz789",
    "is_identity_verified": false,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### GBG Verification Polling

**GET /api/users/verify/gbg?instance_id={kyc_instance_id}**

**Response:**
```json
{
  "data": {
    "status": "PASS" | "IN_PROGRESS" | "MANUAL" | "FAIL",
    "instance_id": "kyc_xyz789"
  }
}
```

**Status meanings:**
- `PASS` - Identity verified, proceed to dashboard
- `IN_PROGRESS` - Still processing, continue polling
- `MANUAL` - Requires manual review (document upload)
- `FAIL` - Verification failed

## Phone Verification

### usePhoneVerification Hook

**Location:** `src/features/create-profile/hooks/usePhoneVerification.ts`

```typescript
const {
  sendVerificationCode, // Send SMS code
  verifyCode,           // Verify entered code
  sending,              // Loading state for send
  verifying,            // Loading state for verify
  error,                // Error message
  clearError,           // Clear error state
} = usePhoneVerification();
```

## GBG Identity Verification

### useGBGVerification Hook

**Location:** `src/features/create-profile/hooks/useGBGVerification.ts`

```typescript
const {
  startPolling,  // Start polling with instance_id
  stopPolling,   // Stop polling
  result,        // { status, instanceId }
} = useGBGVerification();
```

**Polling behavior:**
- Polls every 3 seconds
- Maximum 60 attempts (3 minutes)
- Stops on PASS, FAIL, or MANUAL status

## Screen States

The CreateProfile screen has multiple states:

### Form State
Normal form display with step navigation.

### Loading State
Shows animated loading screen during:
- Profile creation API call
- GBG verification polling

**Component:** `LoadingState.tsx`

### Success State
Shows success animation before navigating to Dashboard.

**Component:** `SuccessState.tsx`

### Error State
Shows error message with retry button.

**Component:** `ErrorState.tsx`

## Validation

### Step-by-step Validation

Each step validates before proceeding:

```typescript
const validateStep = async (step: number): Promise<boolean> => {
  switch (step) {
    case 1: // Basic Info - Zod validation
    case 2: // Phone Number - Component validation + SMS send
    case 3: // Verification - Code verification
    case 4: // Personal Details - Zod validation
    case 5: // Deposit Limits - Optional, always valid
    case 6: // Stake Limit - Optional, always valid
  }
};
```

### Final Validation

On submit, all required fields are re-validated:

```typescript
export const createProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  // ... other fields
});
```

## Navigation

### Entry Points
- From Login (404 response - no profile)
- From Terms & Conditions

### Exit Points
- **Success path:** Dashboard (via Success screen)
- **Verification required:** VerificationPending screen
- **Back on Step 1:** Login screen

## Mock Scenarios

### Profile Creation

| Scenario | Status | Result |
|----------|--------|--------|
| Success | 201 | GBG polling starts |
| Username Taken | 400 | Error shown |
| Invalid Data | 400 | Error shown |
| Server Error | 500 | Error + Retry |

### GBG Verification

| Scenario | Status | Result |
|----------|--------|--------|
| Pass | 200 | Success → Dashboard |
| In Progress | 200 | Continue polling |
| Manual Review | 200 | Verification Pending |
| Fail | 200 | Verification Pending |

See:
- `src/lib/mocks/handlers/profileHandler.ts`
- `src/lib/mocks/handlers/gbgHandler.ts`

## Regulatory Compliance

The profile creation flow collects data required for:

1. **Identity Verification (KYC)**
   - Full legal name
   - Date of birth
   - Address
   - Phone number

2. **Responsible Gambling**
   - Deposit limits (daily/weekly/monthly)
   - Betting limits

3. **Age Verification**
   - Must be 18+ to create profile
   - DOB validated against current date

## Related Files

### Screens
- `src/features/create-profile/screens/CreateProfile/CreateProfile.tsx`
- `src/features/create-profile/screens/CreateProfile/styles.ts`
- `src/features/create-profile/screens/CreateProfile/validation.ts`

### Components
- `src/features/create-profile/components/BasicInfoStep/`
- `src/features/create-profile/components/PhoneNumberStep/`
- `src/features/create-profile/components/VerificationCodeStep/`
- `src/features/create-profile/components/PersonalDetailsStep/`
- `src/features/create-profile/components/DepositLimitStep/`
- `src/features/create-profile/components/StakeLimitStep/`
- `src/features/create-profile/components/LoadingState/`
- `src/features/create-profile/components/SuccessState/`
- `src/features/create-profile/components/ErrorState/`
- `src/features/create-profile/components/AnimatedStepContainer/`

### Hooks
- `src/features/create-profile/hooks/useCreateProfileForm.ts`
- `src/features/create-profile/hooks/useCreateProfile.ts`
- `src/features/create-profile/hooks/usePhoneVerification.ts`
- `src/features/create-profile/hooks/useGBGVerification.ts`

### API Services
- `src/services/apis/User/useCreateProfile.ts`
- `src/services/apis/User/useVerifyGBG.ts`

### Mocks
- `src/lib/mocks/handlers/profileHandler.ts`
- `src/lib/mocks/handlers/gbgHandler.ts`
