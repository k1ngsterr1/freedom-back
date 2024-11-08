import { Module } from '@nestjs/common';
import { JwtCustomModule } from 'src/jwt/jwt.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [JwtCustomModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
