import { makeZodPositiveInt } from 'src/zod/zod.util';
import { z } from 'zod';

export const usersFilterSchema = z.object({
  page: makeZodPositiveInt('page').default(1),
  limit: makeZodPositiveInt('limit').default(10),
});

export type UsersFilterSchema = z.infer<typeof usersFilterSchema>;
