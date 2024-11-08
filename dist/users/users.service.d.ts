import { LoginRequest, RegisterRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/jwt/jwt.service';
export declare class UsersService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(data: RegisterRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(data: LoginRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
