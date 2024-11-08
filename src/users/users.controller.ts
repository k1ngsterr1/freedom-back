import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest, RegisterRequest } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/register')
  async register(@Body() data: RegisterRequest) {
    return this.usersService.register(data);
  }
  @Post('/login')
  async login(@Body() data: LoginRequest) {
    return this.usersService.login(data);
  }
}
