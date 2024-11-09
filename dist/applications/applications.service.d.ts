import { AddApplicationRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Application } from '@prisma/client';
export declare class ApplicationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createApplication(data: AddApplicationRequest): Promise<Application>;
    createPdfApplication(userId: number, text: string): Promise<any>;
    getAllApplicationsOrderedByEvaluation(page?: number): Promise<{
        id: number;
        userId: number | null;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string | null;
        employmentType: string | null;
        salary: number[];
        additional: string[];
        contacts: string[];
        work_experience: string[];
        experience: number | null;
        position: string | null;
        location: string | null;
        summary: string | null;
        evaluation: number | null;
    }[]>;
    evaluateApplication(data: AddApplicationRequest): Promise<number>;
}
