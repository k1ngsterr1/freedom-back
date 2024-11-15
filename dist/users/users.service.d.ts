import { LoginRequest, RegisterRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/jwt/jwt.service';
export declare class UsersService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(data: RegisterRequest): Promise<{
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        mbti: string | null;
        accessToken: string;
        refreshToken: string;
    }>;
    login(data: LoginRequest): Promise<{
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        mbti: string | null;
        accessToken: string;
        refreshToken: string;
    }>;
}
