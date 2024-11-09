import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatService, ChatGateway, PrismaService],
})
export class ChatModule {}
