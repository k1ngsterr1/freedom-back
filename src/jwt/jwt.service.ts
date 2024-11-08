import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateToken(
    payload: { id: number; email: string },
    type: 'refresh' | 'access',
  ): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        expiresIn: type === 'refresh' ? '1h' : '7d',
        secret:
          type === 'refresh'
            ? process.env.JWT_REFRESH_SECRET
            : process.env.JWT_ACCESS_SECRET,
      });
    } catch (error) {
      throw new HttpException(
        `Failed to generate ${type} token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyToken(token: string, type: 'refresh' | 'access'): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret:
          type === 'refresh'
            ? process.env.JWT_REFRESH_SECRET
            : process.env.JWT_ACCESS_SECRET,
      });
    } catch (error) {
      throw new HttpException(`Invalid token`, HttpStatus.FORBIDDEN);
    }
  }
}
