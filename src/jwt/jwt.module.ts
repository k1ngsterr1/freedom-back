// jwt.module.ts (Shared Module for JWT)
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service'; // Custom JwtService
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtService, JwtStrategy, JwtAuthGuard],
  exports: [JwtService, JwtAuthGuard],
})
export class JwtCustomModule {}
