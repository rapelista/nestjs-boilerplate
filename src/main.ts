import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './commons/transforms/response.interceptor';
import { ZodValidationFilter } from './commons/validations/zod/zod.filter';
import { PrismaFilter } from './databases/prisma/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new PrismaFilter(), new ZodValidationFilter());
  await app.listen(3000);
}
bootstrap();
