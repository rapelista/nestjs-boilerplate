import { z } from 'zod';

export function makeZodPositiveInt(context: string) {
  return z.coerce
    .number({
      invalid_type_error: `${context} must be a number`,
    })
    .int(`${context} must be an integer`)
    .positive(`${context} must be a positive number`);
}
