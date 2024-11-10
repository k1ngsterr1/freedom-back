import { VacancyService } from './vacancy.service';
import { AddVacancyRequest } from './types';
export declare class VacancyController {
    private readonly vacancyService;
    constructor(vacancyService: VacancyService);
    addVacancy(data: AddVacancyRequest, req: any): Promise<{
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
        requirements: string[];
        location: string | null;
        additional: string[];
        contacts: string[];
        created_at: string | null;
    }>;
    recommendResume(id: number): Promise<any>;
    getAllVacancies(): Promise<{
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
        requirements: string[];
        location: string | null;
        additional: string[];
        contacts: string[];
        created_at: string | null;
    }[]>;
    getVacancyById(id: number): Promise<{
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
        requirements: string[];
        location: string | null;
        additional: string[];
        contacts: string[];
        created_at: string | null;
    }>;
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
        requirements: string[];
        location: string | null;
        additional: string[];
        contacts: string[];
        created_at: string | null;
    }>;
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
        requirements: string[];
        location: string | null;
        additional: string[];
        contacts: string[];
        created_at: string | null;
    }>;
}
