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
exports.VacancyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("axios");
let VacancyService = class VacancyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVacancy(data) {
        const vacancy = await this.prisma.vacancy.create({ data: data });
        return vacancy;
    }
    async findAll() {
        const vacancies = await this.prisma.vacancy.findMany();
        return vacancies;
    }
    async findOne(id) {
        const vacancy = await this.prisma.vacancy.findFirst({ where: { id: id } });
        if (!vacancy) {
            throw new common_1.HttpException('Not found', 404);
        }
        return;
    }
    async updateVacancy(id, data) {
        const updatedVacancy = await this.prisma.vacancy.update({
            where: { id: id },
            data: data,
        });
        if (!updatedVacancy) {
            throw new common_1.HttpException('Not found', 404);
        }
        return updatedVacancy;
    }
    async recommend() {
        const applications = await this.prisma.application.findMany({
            orderBy: { evaluation: 'asc' },
        });
        const prompt = `
    Your are professional HR with 30 years of experience, your are the best at hiring the best workers for every position based on given requirements of the job and workers applications data;
    Do not wrap the json codes in JSON markers;
    You need to sort top 10 best applications from all the applications;
    Applications data: <start> ${applications} <end>;
    Your answer must be the list of these applications;
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
        return JSON.parse(response.data.choices[0].message.content.trim());
    }
    async deleteVacancy(id) {
        const vacancy = await this.prisma.vacancy.delete({ where: { id: id } });
        if (!vacancy) {
            throw new common_1.HttpException('Not found', 404);
        }
        return vacancy;
    }
};
exports.VacancyService = VacancyService;
exports.VacancyService = VacancyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VacancyService);
//# sourceMappingURL=vacancy.service.js.map