import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => this.responseHandler(data, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(_: unknown, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).json({
      timestamp: new Date().toISOString(),
    });
  }

  responseHandler(res: T, _: ExecutionContext) {
    return {
      data: res,
    };
  }
}
