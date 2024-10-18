// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocketModule } from './sockets/socket.module';
import { PingModule } from './ping/ping.module';
import { MapsModule } from './maps/maps.module';
import { TrazasModule } from './trazas/traza.module';
import { LocalizacionModule } from './localizacion/localizacion.module';
import { CommonModule } from '@raptorjs/common';
import { HttpModule } from '@nestjs/axios';
import { DeviceModule } from './devices/device.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      name: 'DefaultConnection',
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: process.env.TR_MODE === "development" ? true : false,
      logging: process.env.TR_MODE === "development" ? console.log : false,
    }),
    SequelizeModule.forRoot({
      name: 'MapsConnection',
      dialect: 'postgres',
      host: process.env.MAPS_DB_HOST,
      port: +process.env.MAPS_DB_PORT,
      username: process.env.MAPS_DB_USER,
      password: process.env.MAPS_DB_PASS,
      database: process.env.MAPS_DB_NAME,
      autoLoadModels: true,
      synchronize: process.env.TR_MODE === "development" ? true : false,
      logging: process.env.TR_MODE === "development" ? console.log : false,
    }),
    SocketModule,
    DeviceModule,
    PingModule,
    MapsModule,
    TrazasModule,
    LocalizacionModule,
    CommonModule,
    HttpModule,
  ],
})
export class AppModule {}
