import { HttpException, Injectable } from '@nestjs/common';
import { AddApplicationRequest } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Application } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}
  async createApplication(data: AddApplicationRequest): Promise<Application> {
    console.log(data);
    const { userId, salary } = data;
    if (salary.length > 2 || (salary.length === 2 && salary[0] > salary[1])) {
      throw new HttpException('Invalid salary', 400);
    }

    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    data.evaluation = await this.evaluateApplication(data);
    return await this.prisma.application.create({ data: data });
  }

  async createPdfApplication(userId: number, text: string): Promise<any> {
    try {
      const prompt = `
    Your job is to divide the text into JSON fields without missing any information.
    Do not wrap the json codes in JSON markers.
    Generate JSON from this text: <start> ${text} <end>,
    Use this as example as strict example of JSON format and do not add any additional fields, you must divide the text into them:
    If some of the fields are missing or empty, then use this table:
    hard_skills = [], soft_skills = [], work_experience = [], formatOfWork = "", employmentType = "", experience = null,salary = [], position = "", location = "", additional = [], summary = "", contacts = []
    {
      "hard_skills": ["React", "Node.js", "TypeScript"],
      "soft_skills": ["Teamwork", "Problem-solving"],
      "formatOfWork": "remote",
      "employmentType": "full-time",
      "experience": 2.5,
      "salary": [100000, 150000],
      "position": "Frontend Developer",
      "location": "Russia",
      "additional": ["Kazakh (Native)", "English (Advanced)"],
      "summary": "Motivated developer looking for long-term opportunities in frontend development.",
      "work_experience": [
"
Full Stack Developer
Showtime Mafia | https://mafshow.kz
2023 
Developed backend RESTful APIs using Express.js with TypeScript.
Implemented Redis caching to enhance data retrieval performance.
Integrated WebSockets for real-time communication, enabling live chat and room generation for online Mafia gameplay.
Managed PostgreSQL databases using Sequelize ORM on Railway hosting platform.
Utilized VideoSDK for real-time multi-user camera connections on both frontend (React with Astro) and backend.
Created an admin panel for superusers, including image authentication for user verification.
Ensured security through JWT authentication and CORS policies.
",
"
Backend Developer
Spark Studio | https://sparkstudio.kz
2024 
Integrated frontend components built with Ant Design into the backend infrastructure.
Configured Nginx with reverse proxy and load balancing to improve performance on multiple servers managed with PM2.
Developed RESTful APIs using Express.js with TypeScript.
Planned future integration with Redis for caching to enhance performance.
Managed PostgreSQL databases using Sequelize ORM.
"
]
      ]
      "contacts": ["https://t.me/startraveller", "erlanzh.gg@gmail.com"]
    }
    `;

      // Make the API call to OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      let applicationDataString =
        response.data.choices[0].message.content.trim();
      console.log(applicationDataString);

      let applicationData: any;
      try {
        applicationData = JSON.parse(applicationDataString);
      } catch (parseError) {
        throw new HttpException('Invalid pdf file', 400);
      }

      applicationData.evaluation =
        await this.evaluateApplication(applicationData);

      const createdApplication = await this.prisma.application.create({
        data: {
          ...applicationData,
          user: {
            connect: { id: userId },
          },
        },
      });

      return createdApplication;
    } catch (error) {
      console.error('Error in createPdfApplication:', error);
      throw error;
    }
  }

  async evaluateApplication(data: AddApplicationRequest): Promise<number> {
    let score = 0;

    const weights = {
      hard_skills: 5,
      soft_skills: 3,
      formatOfWork: 2,
      employmentType: 2,
      work_experience: 4,
      experience: 4,
      salary: 1,
      position: 5,
      location: 3,
      additional: 1,
      summary: 2,
      contacts: 2,
    };

    if (data.hard_skills && data.hard_skills.length > 0) {
      score += weights.hard_skills;
    }

    if (data.soft_skills && data.soft_skills.length > 0) {
      score += weights.soft_skills;
    }

    if (data.formatOfWork) {
      score += weights.formatOfWork;
    }

    if (data.employmentType) {
      score += weights.employmentType;
    }

    if (data.experience !== undefined) {
      if (data.experience >= 5) {
        score += weights.experience * 1.5;
      } else if (data.experience >= 2) {
        score += weights.experience;
      } else {
        score += weights.experience * 0.5;
      }
    }
    if (data.work_experience !== undefined && data.work_experience.length > 0) {
      for (var i = 0; i < data.work_experience.length; i++) {
        if (
          data.work_experience[i].length >= 50 &&
          data.work_experience[i].length <= 150
        ) {
          score += weights.work_experience * 1.5;
        } else {
          score += weights.work_experience;
        }
      }
    }

    if (data.salary && data.salary.length > 0) {
      score += weights.salary;
    }

    if (data.position) {
      score += weights.position;
    }

    if (data.location) {
      score += weights.location;
    }

    if (data.additional && data.additional.length > 0) {
      score += weights.additional;
    }

    if (data.summary) {
      score += weights.summary;
      if (data.summary.length >= 475 && data.summary.length <= 600) {
        score += 1;
      }
    }

    if (data.contacts && data.contacts.length > 0) {
      score += weights.contacts;
    }

    return score;
  }
}
