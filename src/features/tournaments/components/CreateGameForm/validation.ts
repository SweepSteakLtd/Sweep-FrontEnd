import { z } from 'zod';

export const createGameSchema = z.object({
  gameName: z
    .string()
    .min(1, 'Game name is required')
    .min(3, 'Game name must be at least 3 characters'),
  tournamentId: z.string().min(1, 'Tournament is required'),
  entryFee: z
    .string()
    .min(1, 'Entry fee is required')
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 20 && num <= 1500;
      },
      { message: 'Entry fee must be between £20 and £1500' },
    ),
  maxEntries: z
    .string()
    .min(1, 'Max entries is required')
    .refine(
      (val) => {
        const num = parseInt(val);
        return !isNaN(num) && num > 0;
      },
      { message: 'Max entries must be greater than 0' },
    ),
});

export type CreateGameFormData = z.infer<typeof createGameSchema>;
