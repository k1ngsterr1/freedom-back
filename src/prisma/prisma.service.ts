import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    const arr = [
      {
        hard_skills: [
          'JavaScript',
          'TypeScript',
          'React',
          'Next.js',
          'MUI',
          'AntD',
          'Tailwind',
          'HTML',
          'CSS',
          'SCSS',
          'GraphQL',
          'MobX',
          'Zustand',
          'Redux',
          'React-hook-form',
          'React-router',
          'Tanstack-query',
          'Git',
          'Node.js',
          'Fastify',
          'Nest',
          'MongoDB',
          'SQLite',
          'ETA',
          'Pug',
          'Redis',
          'Jest',
          'Vitest',
        ],
        soft_skills: [
          'Clean code',
          'Reusable components',
          'Learning new skills',
        ],
        work_experience: ['1.5 years in Frontend'],
        formatOfWork: 'remote, offline',
        employmentType: 'full-time, part-time, project-based',
        experience: 1.5,
        salary: [50000],
        position: 'Frontend, Fullstack',
        location: 'Russia',
        additional: ['English - B1', 'Open to relocation'],
        summary:
          'Aspiring to develop towards fullstack development, writing clean and reusable code, learning new patterns and solving problems on leetcode.',
        contacts: ['@console_dot_log'],
      },
      {
        hard_skills: [
          'JavaScript',
          'TypeScript',
          'React',
          'Next.js',
          'Redux',
          'Redux Toolkit',
          'MobX',
          'Zustand',
          'React-router',
          'i18n',
          'Tailwind CSS',
          'MUI',
          'AntD',
          'SCSS',
          'CSS',
          'Styled Components',
          'GSAP',
          'GraphQL',
          'Node.js',
          'Express.js',
          'Fastify',
          'Nest',
          'MongoDB',
          'Mongoose',
          'Jest',
          'Vitest',
          'React Testing Library',
          'Storybook',
          'Loki',
        ],
        soft_skills: ['Teamwork', 'Leadership', 'Independent project handling'],
        work_experience: ['2.5 years in development'],
        formatOfWork: 'remote',
        employmentType: 'full-time, part-time, project-based',
        experience: 1.0,
        salary: [80000],
        position: 'Frontend / Fullstack',
        location: 'Russia',
        additional: ['English - B1', 'Experience with Linux'],
        summary:
          'Looking for new experience with more frontend focus, but open to backend junior roles for further development.',
        contacts: ['@computeMouse'],
      },
      {
        hard_skills: [
          'JavaScript',
          'TypeScript',
          'Node.js',
          'Go',
          'React',
          'Next.js',
          'Vue',
          'Nuxt.js',
          'Storybook',
          'Figma',
          'Unit Testing',
          'Nest',
          'Express',
          'SQL',
          'REST',
          'Swagger',
          'GRPC',
          'Git',
        ],
        soft_skills: [
          'Leadership in small teams',
          'Teamwork',
          'Independent project handling',
        ],
        work_experience: ['4.5 years in development'],
        formatOfWork: 'remote',
        employmentType: 'full-time, part-time, project-based',
        experience: 4.5,
        salary: [1800],
        position: 'Middle Fullstack, Senior Frontend / Middle Backend',
        location: 'Uzbekistan',
        additional: ['Considering transition to Go', 'Experience in startups'],
        summary:
          'Experienced in leading small teams and building web applications from scratch. Interested in transitioning towards Go.',
        contacts: ['https://t.me/RavshanSelimov'],
      },
      {
        hard_skills: [
          'React',
          'JavaScript',
          'TypeScript',
          'Redux',
          'Redux Toolkit',
          'SCSS',
          'SCSS Modules',
          'React-router-dom',
          'HTML5',
          'CSS3',
          'BEM',
          'MUI',
          'Git',
          'Github',
          'Webpack',
          'Vite',
        ],
        soft_skills: ['Teamwork', 'Eagerness to learn'],
        work_experience: ['Intern experience'],
        formatOfWork: 'remote',
        employmentType: 'full-time, part-time, project-based',
        experience: 0.0,
        salary: [50000],
        position: 'Intern/Junior Frontend Developer',
        location: 'Russia',
        additional: ['English - B1-B2'],
        summary:
          'Eager to gain real experience working on commercial projects, willing to learn and adapt to new tools.',
        contacts: ['@DimaNdLife', 'https://github.com/MelmanPvP'],
      },
      {
        hard_skills: [
          'JavaScript',
          'TypeScript',
          'React',
          'Next.js',
          'TailwindCSS',
          'Typewind',
          'CVA',
          'Webpack',
          'Vite',
          'Turbopack',
          'Git',
          'Figma',
          'Photoshop',
        ],
        soft_skills: ['Teamwork', 'Problem-solving'],
        work_experience: ['2 years in development'],
        formatOfWork: 'remote',
        employmentType: 'full-time, project-based',
        experience: 2.0,
        salary: [140000],
        position: 'Frontend Developer',
        location: 'Russia',
        additional: ['English - B2', 'Russian - Native'],
        summary:
          'Over 1.5 years of experience developing projects of various complexities, both in teams and solo.',
        contacts: ['@kenuki_chan'],
      },
    ];
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
