import { Application } from '@prisma/client';

export type AddApplicationRequest = Omit<Application, 'id'> & {
  userId: number;
};
