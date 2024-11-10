// src/vacancy/vacancy.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { AddVacancyRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

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
  async findAllByUserId(userId: number) {
    const vacancies = await this.prisma.vacancy.findMany({
      where: { userId: userId },
    });
    if (!vacancies) {
      throw new HttpException('Vacancies not found', 404);
    }
    return vacancies;
  }

  async findOne(id: number) {
    const vacancy = await this.prisma.vacancy.findFirst({ where: { id: id } });
    if (!vacancy) {
      throw new HttpException('Not found', 404);
    }
    return vacancy;
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
  async recommend(vacancyId: number) {
    const applications = await this.prisma.application.findMany();
    const vacancy = await this.prisma.vacancy.findFirst({
      where: { id: vacancyId },
    });
    if (!vacancy) {
      throw new HttpException('Vacancy not found', 404);
    }
    const prompt = `
    Your are professional HR with 30 years of experience, your are the best at hiring the best workers for every position based on given requirements of the job and workers applications data;
    Do not wrap the json codes in JSON markers;
    You need to sort top 3 best applications from all the applications;
    Applications data: <start> ${JSON.stringify(applications)} <end>;
    Vacancy data: <start> ${JSON.stringify(vacancy)} <end>;
    Your answer must be the list of these applications;
    `;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    let answer: any;
    try {
      answer = JSON.parse(response.data.choices[0].message.content.trim());
    } catch (error) {
      throw new HttpException(
        'Resume that matchs your vacancy are not found',
        400,
      );
    }
    return answer;
  }

  async deleteVacancy(id: number) {
    const vacancy = await this.prisma.vacancy.delete({ where: { id: id } });
    if (!vacancy) {
      throw new HttpException('Not found', 404);
    }
    return vacancy;
  }
}
