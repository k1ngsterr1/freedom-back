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
    Your are best worker to convert text to JSON and string.
    Generate JSON data from this text ${text},
    Your JSON structure must look like following:
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
      "contacts": ["https://t.me/startraveller", "GitHub: available on request"]
    }
    If all the fields are empty provide text like this: "Your pdf file is invalid."
    Strict answer as JSON format or the "Your pdf file is invalid." text
    Do not wrap the json codes in JSON markers"
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

      let applicationData;
      try {
        applicationData = JSON.parse(applicationDataString);
      } catch (parseError) {
        throw new HttpException('Invalid pdf file', 400);
      }

      applicationData.evaluation =
        await this.evaluateApplication(applicationData);

      const createdApplication = await this.prisma.application.create({
        data: { ...applicationData, userId: userId },
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
