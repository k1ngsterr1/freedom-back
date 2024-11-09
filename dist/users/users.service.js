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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const jwt_service_1 = require("../jwt/jwt.service");
let UsersService = class UsersService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(data) {
        let { email, username, password, role } = data;
        let user = await this.prisma.user.findFirst({ where: { email: email } });
        if (user) {
            throw new common_1.HttpException('User with this email already exists', 400);
        }
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        user = await this.prisma.user.create({
            data: {
                email,
                username,
                password,
                role,
            },
        });
        return {
            accessToken: await this.jwt.generateToken({ id: user.id, email: user.email }, 'access'),
            refreshToken: await this.jwt.generateToken({ id: user.id, email: user.email }, 'refresh'),
        };
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('User not found', 404);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new common_1.HttpException('Invalid credentials', 401);
        }
        return {
            accessToken: await this.jwt.generateToken({ id: user.id, email: user.email }, 'access'),
            refreshToken: await this.jwt.generateToken({ id: user.id, email: user.email }, 'refresh'),
            role: user.role,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_service_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map