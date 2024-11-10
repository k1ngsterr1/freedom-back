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
        work_experience: string[];
        formatOfWork: string | null;
        employmentType: string | null;
        experience: number | null;
        salary: number[];
        position: string | null;
        location: string | null;
        additional: string[];
        summary: string | null;
        contacts: string[];
        evaluation: number | null;
    }[]>;
    findOne(id: number): Promise<Application>;
    evaluateApplication(data: AddApplicationRequest): Promise<number>;
}
