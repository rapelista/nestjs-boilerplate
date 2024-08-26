import { makeZodPositiveInt } from 'src/zod/zod.util';
import { z } from 'zod';

export const userSchema = z.object({
  id: makeZodPositiveInt('id'),
});

export type UserSchema = z.infer<typeof userSchema>;
