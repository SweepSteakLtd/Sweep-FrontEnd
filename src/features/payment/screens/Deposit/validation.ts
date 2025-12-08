import { z } from 'zod';

export const MIN_AMOUNT = 5;
export const MAX_AMOUNT = 5000;

export const depositSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)), 'Please enter a valid amount')
    .refine((val) => parseFloat(val) >= MIN_AMOUNT, `Minimum deposit is £${MIN_AMOUNT}`)
    .refine((val) => parseFloat(val) <= MAX_AMOUNT, `Maximum deposit is £${MAX_AMOUNT}`),
});

export type DepositFormData = z.infer<typeof depositSchema>;
