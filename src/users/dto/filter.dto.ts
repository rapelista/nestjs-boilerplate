import { z } from 'zod';

export const usersFilterSchema = z.object({
  page: z.coerce
    .number({
      invalid_type_error: 'page must be a number',
    })
    .int('page must be an integer')
    .positive('page must be a positive number')
    .default(1),
  limit: z.coerce
    .number({
      invalid_type_error: 'limit must be a number',
    })
    .int('limit must be an integer')
    .positive('limit must be a positive number')
    .default(10),
});

export type UsersFilterSchema = z.infer<typeof usersFilterSchema>;
