import { z } from 'zod';
import { makeZodPositiveInt } from '../zod.util';

export const commonSchema = z.object({
  id: makeZodPositiveInt('id'),
});

export type CommonSchema = z.infer<typeof commonSchema>;
