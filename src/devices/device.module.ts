// device.module.ts
import { Module } from '@nestjs/common';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controllers/device.controller';
import { DeviceModel } from './models/device.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '@raptorjs/common';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    SequelizeModule.forFeature([DeviceModel], 'DefaultConnection'), // Inyecta la conexión 'DefaultConnection'
    CommonModule,
    HttpModule
  ],
  providers: [DeviceService],
  controllers: [
    DeviceController, 
  ],
  exports: [DeviceService],
})
export class DeviceModule {}
