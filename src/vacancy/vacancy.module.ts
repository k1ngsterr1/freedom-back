import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplicationService } from 'src/applications/applications.service';

@Module({
  providers: [VacancyService, PrismaService, ApplicationService],
  controllers: [VacancyController],
})
export class VacancyModule {}
