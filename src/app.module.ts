import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './databases/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
