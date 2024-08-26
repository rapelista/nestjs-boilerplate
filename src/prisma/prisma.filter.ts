import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

type ErrorStatusMappingType = {
  [key: string]: number;
};

type ErrorCodeMappingType = {
  [key: string]: string;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  private errorStatusMapping: ErrorStatusMappingType = {
    P2025: HttpStatus.NOT_FOUND,
  };

  private errorCodeMapping: ErrorCodeMappingType = {
    P2025: 'not_found',
  };

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = this.errorStatusMapping[exception.code] || 500;

    return response.status(status).json({
      type: 'client_error',
      errros: [
        {
          code: this.errorCodeMapping[exception.code] || 'unknown',
          message: exception.message.toLocaleLowerCase(),
          attr: null,
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }
}
