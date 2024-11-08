import { Module } from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ApplicationService, PrismaService],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
