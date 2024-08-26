import { z } from 'zod';
import { userSchema } from '../entities/user.dto';

export const createUserSchema = userSchema;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
