import { HttpException, Injectable } from '@nestjs/common';
import { LoginRequest, RegisterRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: RegisterRequest) {
    let { email, username, password, role } = data;

    let user = await this.prisma.user.findFirst({ where: { email: email } });

    if (user) {
      throw new HttpException('User with this email already exists', 400);
    }
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    user = await this.prisma.user.create({
      data: {
        email,
        username,
        password,
        role,
      },
    });

    return {
      accessToken: await this.jwt.generateToken(
        { id: user.id, email: user.email },
        'access',
      ),
      refreshToken: await this.jwt.generateToken(
        { id: user.id, email: user.email },
        'refresh',
      ),
    };
  }
  async login(data: LoginRequest) {
    const { email, password } = data;
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new HttpException('Invalid credentials', 401);
    }
    return {
      accessToken: await this.jwt.generateToken(
        { id: user.id, email: user.email },
        'access',
      ),
      refreshToken: await this.jwt.generateToken(
        { id: user.id, email: user.email },
        'refresh',
      ),
      role: user.role,
    };
  }
}
