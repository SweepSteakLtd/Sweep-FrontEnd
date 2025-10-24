import { z } from 'zod';

export const createProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
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
  depositLimit: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Deposit limit must be greater than 0' },
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
