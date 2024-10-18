import { Controller, Post, Body } from '@nestjs/common';
import { SocketService } from '../services/socket.service';
import { Permission } from '@raptorjs/polizei';

@Controller('/socket')
@Permission()
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post('emit')
  broadcast(@Body('eventName') eventName: string, @Body('data') data: any) {
    this.socketService.broadcast(eventName, data);
  }
}
