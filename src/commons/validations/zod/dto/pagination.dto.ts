import { z } from 'zod';
import { makeZodPositiveInt } from '../zod.util';

export const paginationSchema = z.object({
  page: makeZodPositiveInt('page').default(1),
  limit: makeZodPositiveInt('limit').default(10),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
