import { Module } from '@nestjs/common';
import { PrismaModule } from './databases/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [UsersModule, PrismaModule],
})
export class AppModule {}
