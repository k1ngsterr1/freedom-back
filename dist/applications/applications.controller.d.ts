import { AddApplicationRequest } from './types';
import { ApplicationService } from './applications.service';
export declare class ApplicationsController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    addApplication(data: AddApplicationRequest, req: any): Promise<{
        id: number;
        userId: number;
        hard_skills: string[];
        soft_skills: string[];
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
    }>;
    addPdfApplication(req: any, text: any): Promise<any>;
}
