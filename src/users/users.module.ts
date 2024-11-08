import { Module } from '@nestjs/common';
import { JwtCustomModule } from 'src/jwt/jwt.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplicationsModule } from 'src/applications/applications.module';

@Module({
  imports: [JwtCustomModule, ApplicationsModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
