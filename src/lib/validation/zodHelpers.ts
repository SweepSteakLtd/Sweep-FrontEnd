import type { ZodSchema } from 'zod';

export interface ValidationResult<T extends Record<string, string | undefined>> {
  success: boolean;
  errors: T;
}

/**
 * Validates data using a Zod schema and extracts field-level errors
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Object with success flag and field errors
 */
export function validateWithZod<T extends Record<string, string | undefined>>(
  schema: ZodSchema,
  data: unknown,
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      errors: {} as T,
    };
  }

  // Extract field-level errors
  const errors = {} as T;
  result.error.issues.forEach((err) => {
    const field = err.path[0] as keyof T;
    if (!errors[field]) {
      errors[field] = err.message as T[keyof T];
    }
  });

  return {
    success: false,
    errors,
  };
}
