import { AddVacancyRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class VacancyService {
    private prisma;
    constructor(prisma: PrismaService);
    createVacancy(data: AddVacancyRequest): Promise<{
        id: number;
        userId: number;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        additional: string[];
        contacts: string[];
        title: string | null;
        description: string | null;
        task: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        userId: number;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        additional: string[];
        contacts: string[];
        title: string | null;
        description: string | null;
        task: string | null;
    }[]>;
    findOne(id: number): Promise<void>;
    updateVacancy(id: number, data: Partial<AddVacancyRequest>): Promise<{
        id: number;
        userId: number;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        additional: string[];
        contacts: string[];
        title: string | null;
        description: string | null;
        task: string | null;
    }>;
    deleteVacancy(id: number): Promise<{
        id: number;
        userId: number;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        additional: string[];
        contacts: string[];
        title: string | null;
        description: string | null;
        task: string | null;
    }>;
}
