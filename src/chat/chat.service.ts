// chat.service.ts
import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  private users = new Map<number, string>();

  async registerUser(userId: number, socketId: string) {
    this.users.set(userId, socketId);
    console.log(`User registered: ${userId} (Socket ID: ${socketId})`);
  }

  async removeUserBySocketId(socketId: string) {
    const userId = await this.getUserIdBySocketId(socketId);
    if (userId) {
      this.users.delete(userId);
      console.log(`User disconnected: ${socketId} (User ID: ${userId})`);
    }
  }

  async getSocketIdByUserId(userId: number): Promise<string | undefined> {
    return this.users.get(userId);
  }

  private async getUserIdBySocketId(
    socketId: string,
  ): Promise<number | undefined> {
    for (const [userId, id] of this.users.entries()) {
      if (id === socketId) return userId;
    }
    return undefined;
  }

  async saveMessage(
    senderId: number,
    recipientId: number,
    message: string,
  ): Promise<Chat> {
    return this.prisma.chat.create({
      data: {
        senderId: senderId,
        recipientId: recipientId,
        message,
      },
    });
  }
}
