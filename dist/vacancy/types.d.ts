import { Vacancy } from '@prisma/client';
export type AddVacancyRequest = Omit<Vacancy, 'id'>;
