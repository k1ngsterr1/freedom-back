"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("axios");
let ApplicationService = class ApplicationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createApplication(data) {
        console.log(data);
        const { userId, salary } = data;
        if (salary.length > 2 || (salary.length === 2 && salary[0] > salary[1])) {
            throw new common_1.HttpException('Invalid salary', 400);
        }
        const user = await this.prisma.user.findFirst({ where: { id: userId } });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        data.evaluation = await this.evaluateApplication(data);
        return await this.prisma.application.create({ data: data });
    }
    async createPdfApplication(userId, text) {
        try {
            if (text.length > 5000) {
                throw new common_1.HttpException('Text too long', 400);
            }
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
            const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            let applicationDataString = response.data.choices[0].message.content.trim();
            console.log(applicationDataString);
            let applicationData;
            try {
                applicationData = JSON.parse(applicationDataString);
            }
            catch (parseError) {
                throw new common_1.HttpException('Invalid pdf file', 400);
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
        }
        catch (error) {
            console.error('Error in createPdfApplication:', error);
            throw error;
        }
    }
    async evaluateApplication(data) {
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
            }
            else if (data.experience >= 2) {
                score += weights.experience;
            }
            else {
                score += weights.experience * 0.5;
            }
        }
        if (data.work_experience !== undefined && data.work_experience.length > 0) {
            for (var i = 0; i < data.work_experience.length; i++) {
                if (data.work_experience[i].length >= 50 &&
                    data.work_experience[i].length <= 150) {
                    score += weights.work_experience * 1.5;
                }
                else {
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
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationService);
//# sourceMappingURL=applications.service.js.map