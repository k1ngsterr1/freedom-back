import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddApplicationRequest } from './types';
import { ApplicationService } from './applications.service';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { pdfFileUploadOptions } from 'src/config/upload.config';

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
  async addPdfApplication(@Req() req, @Body() text) {
    return this.applicationService.createPdfApplication(req.user.id, text);
  }
}
