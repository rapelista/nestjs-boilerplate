import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodValidationFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;

    response.status(status).json({
      type: 'validation_error',
      errors: exception.issues.map(({ code, path, message }) => ({
        code,
        attr: path.join('.'),
        detail: message,
      })),
      timestamp: new Date().toISOString(),
    });
  }
}
