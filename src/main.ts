import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaFilter } from './prisma/prisma.filter';
import { TransformInterceptor } from './transform/transform.interceptor';
import { ZodValidationFilter } from './zod/zod.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new PrismaFilter(), new ZodValidationFilter());
  await app.listen(3000);
}
bootstrap();
