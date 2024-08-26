import { z } from 'zod';
import { userSchema } from '../entities/user.dto';

export const updateUserSchema = userSchema.optional();

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
