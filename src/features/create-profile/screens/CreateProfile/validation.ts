import { z } from 'zod';

const middleNamesSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      // Optional field: allow undefined/empty string
      if (!val || val.trim() === '') return true;
      // Allow letters, spaces, apostrophes, and hyphens (incl. common accented latin chars)
      return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(val.trim());
    },
    { message: 'Middle names can only contain letters, spaces, hyphens, and apostrophes' },
  )
  .refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      return val.trim().length <= 50;
    },
    { message: 'Middle names must be 50 characters or less' },
  );

// Step 1: Basic Info
export const basicInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  middleNames: middleNamesSchema,
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
});

// Step 2 & 3: Phone verification (handled by component refs)
// No schema needed as validation happens in PhoneNumberStep and VerificationCodeStep

// Step 4: Personal Details
export const personalDetailsSchema = z.object({
  dateOfBirth: z.date({
    message: 'Date of birth is required',
  }),
  address1: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: z
    .string()
    .min(1, 'Postcode is required')
    .regex(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, 'Please enter a valid UK postcode'),
});

// Step 5: Bio (optional, no validation needed)

// Step 6 & 7: Deposit and betting limits
export const limitsSchema = z.object({
  depositLimitDaily: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Daily deposit limit must be greater than 0' },
    ),
  depositLimitWeekly: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Weekly deposit limit must be greater than 0' },
    ),
  depositLimitMonthly: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Monthly deposit limit must be greater than 0' },
    ),
  bettingLimit: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Betting limit must be greater than 0' },
    ),
});

// Full form schema for final submission
export const createProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  middleNames: middleNamesSchema,
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      'Please enter a valid phone number',
    ),
  bio: z.string().optional(),
  depositLimitDaily: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Daily deposit limit must be greater than 0' },
    ),
  depositLimitWeekly: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Weekly deposit limit must be greater than 0' },
    ),
  depositLimitMonthly: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Monthly deposit limit must be greater than 0' },
    ),
  bettingLimit: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Betting limit must be greater than 0' },
    ),
});

export type CreateProfileFormData = z.infer<typeof createProfileSchema>;
