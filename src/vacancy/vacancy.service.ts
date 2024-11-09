// src/vacancy/vacancy.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { AddVacancyRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VacancyService {
  constructor(private prisma: PrismaService) {}

  async createVacancy(data: AddVacancyRequest) {
    const vacancy = await this.prisma.vacancy.create({ data: data });
    return vacancy;
  }

  async findAll() {
    const vacancies = await this.prisma.vacancy.findMany();
    return vacancies;
  }

  async findOne(id: number) {
    const vacancy = await this.prisma.vacancy.findFirst({ where: { id: id } });
    if (!vacancy) {
      throw new HttpException('Not found', 404);
    }
    return;
  }

  async updateVacancy(id: number, data: Partial<AddVacancyRequest>) {
    const updatedVacancy = await this.prisma.vacancy.update({
      where: { id: id },
      data: data,
    });
    if (!updatedVacancy) {
      throw new HttpException('Not found', 404);
    }
    return updatedVacancy;
  }

  async deleteVacancy(id: number) {
    const vacancy = await this.prisma.vacancy.delete({ where: { id: id } });
    if (!vacancy) {
      throw new HttpException('Not found', 404);
    }
    return vacancy;
  }
}
