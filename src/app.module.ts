import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [UsersModule, ApplicationsModule],
  exports: [PrismaService],
  providers: [PrismaService],
})
export class AppModule {}
