import { Role } from '@prisma/client';
import { makeZodStringMinMax } from 'src/commons/validations/zod/zod.util';
import { z } from 'zod';

export const userSchema = z.object({
  name: makeZodStringMinMax('username', 3, 32).regex(
    /^[a-zA-Z0-9 ]+$/,
    'name must be alphanumeric, space is allowed',
  ),
  username: makeZodStringMinMax('username', 6, 32).regex(
    /^[a-zA-Z0-9_.-]+$/,
    'username must be alphanumeric with . or - or _',
  ),
  role: z.enum([Role.ADMIN, Role.MANAGER, Role.OWNER], {
    message: 'role is invalid',
  }),
});

export type UserSchema = z.infer<typeof userSchema>;
