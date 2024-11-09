import { AddApplicationRequest } from './types';
import { ApplicationService } from './applications.service';
export declare class ApplicationsController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    addApplication(data: AddApplicationRequest, req: any): Promise<{
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
    }>;
    addPdfApplication(req: any, data: {
        text: string;
    }): Promise<any>;
}
