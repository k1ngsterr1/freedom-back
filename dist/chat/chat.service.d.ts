import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private users;
    registerUser(userId: number, socketId: string): Promise<void>;
    removeUserBySocketId(socketId: string): Promise<void>;
    getSocketIdByUserId(userId: number): Promise<string | undefined>;
    private getUserIdBySocketId;
    saveMessage(senderId: number, recipientId: number, message: string): Promise<Chat>;
}
