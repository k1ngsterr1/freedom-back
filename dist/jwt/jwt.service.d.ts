import { JwtService as NestJwtService } from '@nestjs/jwt';
export declare class JwtService {
    private readonly jwtService;
    constructor(jwtService: NestJwtService);
    generateToken(payload: {
        id: number;
        email: string;
    }, type: 'refresh' | 'access'): Promise<string>;
    verifyToken(token: string, type: 'refresh' | 'access'): Promise<any>;
}
