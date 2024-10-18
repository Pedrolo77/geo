import { Module } from '@nestjs/common';
import { MapsController } from './controllers/maps.controller';
import { MapsService } from './services/maps.service';
import { CommonModule } from '@raptorjs/common';
import { PolizeiModule } from '@raptorjs/polizei';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    CommonModule,
    HttpModule,
    PolizeiModule
  ],
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService]
})
export class MapsModule {}
