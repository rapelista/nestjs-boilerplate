import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
  data: any;
  meta?: {
    page: number;
    total_data: number;
    total_page: number;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => this.responseHandler(data, context)),
      // catchError((err: HttpException) =>
      //   throwError(() => this.errorHandler(err, context)),
      // ),
    );
  }

  // errorHandler(exception: unknown, context: ExecutionContext) {
  //   const ctx = context.switchToHttp();
  //   const response = ctx.getResponse();

  //   if (exception instanceof HttpException) {
  //   } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
  //     response.status(500).json({
  //       error: 'dari prisma',
  //     });
  //   } else if (exception instanceof ZodError) {
  //   }

  //   response.status(500).json({
  //     timestamp: new Date().toISOString(),
  //   });
  // }

  responseHandler(res: any, _: ExecutionContext) {
    return { ...res };
  }
}
