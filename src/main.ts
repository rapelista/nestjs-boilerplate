import { AppModule } from '@/app.module';
import { ResponseInterceptor } from '@/commons/interceptors/response.interceptor';
import { ZodValidationFilter } from '@/commons/validations/zod/zod.filter';
import { PrismaFilter } from '@/databases/prisma/prisma.filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new PrismaFilter(), new ZodValidationFilter());
  await app.listen(3000);
}
bootstrap();
