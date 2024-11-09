import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { ApplicationsModule } from './applications/applications.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, ApplicationsModule, VacancyModule, ChatModule],
  exports: [PrismaService],
  providers: [PrismaService],
})
export class AppModule {}
