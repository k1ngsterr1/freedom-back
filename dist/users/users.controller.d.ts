import { LoginRequest, RegisterRequest } from './types';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(data: RegisterRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(data: LoginRequest): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        mbti: string | null;
        accessToken: string;
        refreshToken: string;
    }>;
}
