import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ZodValidationPipe } from 'src/zod/zod.pipe';
import { ZodSchema } from 'zod';
import { commonSchema } from './dto/common.dto';
import { paginationSchema } from './dto/pagination.dto';

function validateDecorator(
  schema: ZodSchema,
  context: 'params' | 'query',
  _meta: unknown,
  ctx: ExecutionContext,
) {
  const request = ctx.switchToHttp().getRequest();
  const validate = new ZodValidationPipe(schema);

  return validate.transform(request[context]);
}

export const ZodValidateCommon = createParamDecorator(
  validateDecorator.bind(null, commonSchema.pick({ id: true }), 'params'),
);

export const ZodValidatePagination = createParamDecorator(
  validateDecorator.bind(null, paginationSchema, 'query'),
);
