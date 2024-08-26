/* eslint-disable @typescript-eslint/no-unused-vars */

import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: T, _: ArgumentMetadata) {
    return this.schema.parse(value);
  }
}
