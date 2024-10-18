import { Module } from '@nestjs/common';
import { MovilwebService } from './services/movil-web.service';
import { PolizeiModule } from '@raptorjs/polizei';
import { PingController } from './Controllers/ping.controller';
import { SocketModule } from '../sockets/socket.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TrazasModule } from '../trazas/traza.module'; 
import { CommonModule } from '@raptorjs/common';
import { HttpModule } from '@nestjs/axios';
import { DeviceModule } from '../devices/device.module';
import { TrazasService } from '../trazas/services/trazas.service';
import { DeviceService } from '../devices/services/device.service';
import { Traza } from '../trazas/models/traza.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceModel } from '../devices/models/device.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Traza, DeviceModel], 'DefaultConnection'),
    ScheduleModule.forRoot(),
    DeviceModule,
    SocketModule,
    ConfigModule,
    TrazasModule,
    CommonModule,
    HttpModule,
    PolizeiModule,
  ],
  controllers: [PingController],
  providers: [MovilwebService, TrazasService, DeviceService], 
  exports: [MovilwebService],
})
export class PingModule {}
