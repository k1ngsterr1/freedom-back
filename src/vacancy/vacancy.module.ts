import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VacancyService, PrismaService],
  controllers: [VacancyController],
})
export class VacancyModule {}
