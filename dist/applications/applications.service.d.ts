import { AddApplicationRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Application } from '@prisma/client';
export declare class ApplicationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createApplication(data: AddApplicationRequest): Promise<Application>;
    createPdfApplication(userId: number, text: string): Promise<any>;
    evaluateApplication(data: AddApplicationRequest): Promise<number>;
}
