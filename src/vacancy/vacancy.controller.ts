// src/vacancy/vacancy.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { AddVacancyRequest } from './types';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addVacancy(@Body() data: AddVacancyRequest, @Req() req) {
    data.userId = req.user.id;
    data.created_at = new Date().toISOString().split('T')[0];
    return await this.vacancyService.createVacancy(data);
  }

  @Get('recommend/:id')
  @UseGuards(JwtAuthGuard)
  async recommendResume(@Param('id', ParseIntPipe) id: number) {
    return await this.vacancyService.recommend(id);
  }

  @Get('get')
  async getAllVacancies() {
    return this.vacancyService.findAll();
  }

  @Get('get/:id')
  async getVacancyById(@Param('id') id: number) {
    return this.vacancyService.findOne(id);
  }

  @Patch('update/:id')
  async updateVacancy(
    @Param('id') id: number,
    @Body() data: Partial<AddVacancyRequest>,
  ) {
    return this.vacancyService.updateVacancy(id, data);
  }

  @Delete('delete/:id')
  async deleteVacancy(@Param('id') id: number) {
    return this.vacancyService.deleteVacancy(id);
  }
}
