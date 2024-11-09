// chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Injectable } from '@nestjs/common';
import { PrivateMessage } from './types';

@Injectable()
@WebSocketGateway(3001, { namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    await this.chatService.removeUserBySocketId(client.id);
  }

  @SubscribeMessage('register')
  async handleRegister(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.registerUser(userId, client.id);
  }

  @SubscribeMessage('message')
  async handlePrivateMessage(
    @MessageBody() message: PrivateMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const { from, to, text } = message;
    const recipientSocketId = await this.chatService.getSocketIdByUserId(to);

    await this.chatService.saveMessage(from, to, text);

    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('privateMessage', message);
    } else {
      client.emit('error', { message: 'User is not connected.' });
    }
  }
}
