import { z } from 'zod';

export const userSchema = z.object({
  id: z.coerce
    .number({
      invalid_type_error: 'page must be a number',
    })
    .int('page must be an integer')
    .positive('page must be a positive number'),
});

export type UserSchema = z.infer<typeof userSchema>;
