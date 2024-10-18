import { Module } from '@nestjs/common';
import { SocketService } from './services/socket.service';
import { PolizeiModule } from '@raptorjs/polizei';
import { SocketController } from './controllers/socket.controller';
import { CommonModule } from '@raptorjs/common';
import {HttpModule} from '@nestjs/axios';
@Module({
  imports: [
    CommonModule,
    HttpModule,
    PolizeiModule
  ],
  controllers: [SocketController],
  providers: [SocketService],
  exports: [SocketService]
})
export class SocketModule {}
