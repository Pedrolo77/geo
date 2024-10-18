// socket.service.ts
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private server: Server;

  constructor() {
    this.server = new Server(parseInt(process.env.SOCKET_PORT) || 3001);

    this.server.on('connection', (socket) => {
    });
  }

  broadcast(eventName: string, data: any) {
    this.server.emit(eventName, data);
  }
}
