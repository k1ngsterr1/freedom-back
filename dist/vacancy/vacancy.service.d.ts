import { AddVacancyRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class VacancyService {
    private prisma;
    constructor(prisma: PrismaService);
    createVacancy(data: AddVacancyRequest): Promise<{
        id: number;
        userId: number;
        title: string | null;
        description: string | null;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        task: string | null;
        additional: string[];
        contacts: string[];
    }>;
    findAll(): Promise<{
        id: number;
        userId: number;
        title: string | null;
        description: string | null;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        task: string | null;
        additional: string[];
        contacts: string[];
    }[]>;
    findOne(id: number): Promise<void>;
    updateVacancy(id: number, data: Partial<AddVacancyRequest>): Promise<{
        id: number;
        userId: number;
        title: string | null;
        description: string | null;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        task: string | null;
        additional: string[];
        contacts: string[];
    }>;
    recommend(): Promise<any>;
    deleteVacancy(id: number): Promise<{
        id: number;
        userId: number;
        title: string | null;
        description: string | null;
        hard_skills: string[];
        soft_skills: string[];
        formatOfWork: string[];
        employmentType: string | null;
        salary: number[];
        task: string | null;
        additional: string[];
        contacts: string[];
    }>;
}
