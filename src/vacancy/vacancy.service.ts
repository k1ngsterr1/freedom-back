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
  async recommend() {
    const applications = await this.prisma.application.findMany({
      orderBy: { evaluation: 'asc' },
    });
    const prompt = `
    Your are professional HR with 30 years of experience, your are the best at hiring the best workers for every position based on given requirements of the job and workers applications data;
    Do not wrap the json codes in JSON markers;
    You need to sort top 10 best applications from all the applications;
    Applications data: <start> ${applications} <end>;
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
    return JSON.parse(response.data.choices[0].message.content.trim());
  }

  async deleteVacancy(id: number) {
    const vacancy = await this.prisma.vacancy.delete({ where: { id: id } });
    if (!vacancy) {
      throw new HttpException('Not found', 404);
    }
    return vacancy;
  }
}
