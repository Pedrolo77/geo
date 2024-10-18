// trazas.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrazasService } from './services/trazas.service';
import { Traza } from './models/traza.model';
import { CommonModule } from '@raptorjs/common';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([Traza], 'DefaultConnection'), 
    CommonModule,
    HttpModule
  ],
  providers: [TrazasService],
  exports: [TrazasService],
})
export class TrazasModule {}
