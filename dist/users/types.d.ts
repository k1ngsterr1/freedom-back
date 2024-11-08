import { Role } from '@prisma/client';
export type RegisterRequest = {
    email: string;
    username: string;
    password: string;
    role: Role;
};
export type LoginRequest = {
    email: string;
    password: string;
};
