import { z } from 'zod';

export function makeZodPositiveInt(context: string) {
  return z.coerce
    .number({
      invalid_type_error: `${context} must be a number`,
    })
    .int(`${context} must be an integer`)
    .positive(`${context} must be a positive number`);
}

export function makeZodStringMinMax(context: string, min: number, max: number) {
  return z
    .string()
    .min(min, `${context} must be at least ${min} characters`)
    .max(max, `${context} must be at most ${max} characters`);
}
