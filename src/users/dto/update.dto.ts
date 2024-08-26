import { Role } from '@prisma/client';
import { makeZodStringMinMax } from 'src/zod/zod.util';
import { z } from 'zod';

export const userUpdateSchema = z.object({
  name: z.optional(
    makeZodStringMinMax('username', 3, 32).regex(
      /^[a-zA-Z0-9 ]+$/,
      'name must be alphanumeric, space is allowed',
    ),
  ),
  username: z.optional(
    makeZodStringMinMax('username', 6, 32).regex(
      /^[a-zA-Z0-9_.-]+$/,
      'username must be alphanumeric with . or - or _',
    ),
  ),
  role: z.enum([Role.ADMIN, Role.MANAGER, Role.OWNER], {
    message: 'role is invalid',
  }),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
