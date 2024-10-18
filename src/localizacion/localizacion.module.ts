// localizacion.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Parada } from './models/parada.model';
import { Ruta } from './models/ruta.model';
import { LocalizacionService } from './services/localizacion.service';
import { LocalizacionController } from './controllers/localizacion.controller';
import { CommonModule } from '@raptorjs/common'
import {HttpModule} from '@nestjs/axios'

@Module({
  imports: [
    SequelizeModule.forFeature([Parada, Ruta], 'DefaultConnection'), // Inyecta la conexión 'MapsConnection'
    CommonModule,
    HttpModule,
  ],
  providers: [LocalizacionService],
  controllers: [LocalizacionController],
  exports: [LocalizacionService]
})
export class LocalizacionModule {}
