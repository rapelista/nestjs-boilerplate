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

type ErrorDetailMappingType = {
  [key: string]: string;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  private errorStatusMapping: ErrorStatusMappingType = {
    P2025: HttpStatus.NOT_FOUND,
    P2002: HttpStatus.CONFLICT,
  };

  private errorCodeMapping: ErrorCodeMappingType = {
    P2025: 'not_found',
    P2002: 'conflict',
  };

  private errorDetailMapping: ErrorDetailMappingType = {
    P2025: 'resource not found',
    P2002: 'resource already exists',
  };

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const status = this.errorStatusMapping[exception.code];
    const code = this.errorCodeMapping[exception.code];
    const detail = this.errorDetailMapping[exception.code];

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(status || 500).json({
      type: 'client_error',
      errros: [
        {
          code: code || 'internal_server_error',
          detail: detail || 'internal server error',
          attr: (exception?.meta?.target as string[])?.join(', ') ?? null,
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }
}
