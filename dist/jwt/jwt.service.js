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
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtService = class JwtService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateToken(payload, type) {
        try {
            return await this.jwtService.signAsync(payload, {
                expiresIn: type === 'refresh' ? '1h' : '7d',
                secret: type === 'refresh'
                    ? process.env.JWT_REFRESH_SECRET
                    : process.env.JWT_ACCESS_SECRET,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to generate ${type} token: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyToken(token, type) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: type === 'refresh'
                    ? process.env.JWT_REFRESH_SECRET
                    : process.env.JWT_ACCESS_SECRET,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`Invalid token`, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtService);
//# sourceMappingURL=jwt.service.js.map