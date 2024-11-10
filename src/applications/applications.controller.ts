import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddApplicationRequest } from './types';
import { ApplicationService } from './applications.service';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post('add')
  @UseGuards(JwtAuthGuard)
  addApplication(@Body() data: AddApplicationRequest, @Req() req) {
    data.userId = req.user.id;

    return this.applicationService.createApplication(data);
  }

  @Post('add-pdf')
  @UseGuards(JwtAuthGuard)
  async addPdfApplication(@Req() req, @Body() data: { text: string }) {
    return this.applicationService.createPdfApplication(req.user.id, data.text);
  }

  @Get('get/:id')
  async getApplicationById(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.findOne(id);
  }
}
