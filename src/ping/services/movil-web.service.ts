import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TrazasService } from '../../trazas/services/trazas.service';
import { SocketService } from '../../sockets/services/socket.service';
import { HttpService } from "@nestjs/axios";
import * as https from 'https';
import { Cron } from '@nestjs/schedule';
import { differenceInHours } from 'date-fns'; 
import { firstValueFrom } from 'rxjs';

const agent = new https.Agent({
  rejectUnauthorized: false
});

@Injectable()
export class MovilwebService {
  private movilwebOptions = {
    url: this.configService.get<string>('MOVILWEB_URL'),
    token: this.configService.get<string>('MOVILWEB_TOKEN'),
    refresh: this.configService.get<number>('MOVILWEB_REFRESH'),
    cron: this.configService.get<string>('MOVILWEB_CRON'), 
  };

  constructor(
    private configService: ConfigService, 
    private trazasService: TrazasService,
    private socketService: SocketService,
    private httpService: HttpService,
  ) {}

  @Cron('*/10 * * * * *')
  public async startTimer() {
    var response = await this.makeRequest();

    if (!response || !response.posiciones) {
      return;
    }

    const posicionesFiltradas = response.posiciones.filter(posicion => {
      const fechaPosicion = new Date(posicion.fecha);
      const diferenciaHoras = differenceInHours(new Date(), fechaPosicion);
      return diferenciaHoras <= 24;
    });

    // Emitir el evento a través del servicio de socket
    this.socketService.broadcast('movil-web', posicionesFiltradas);

    // Crear un lote de trazas
    const trazas = posicionesFiltradas.map(posicion => {
      const { chapa, lat: latitud, lon: longitud } = posicion;
      if (chapa && latitud && longitud) {
        return { chapa, latitud, longitud };
      } else {
        return null;
      }
    }).filter(Boolean); // Filtrar cualquier traza nula

    // Insertar todas las trazas en un solo lote
    if (trazas.length > 0) {
      await this.trazasService.createTrazas(trazas);
    }
  }

  async makeRequest() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.movilwebOptions.url, {
          headers: { 'apikey': this.movilwebOptions.token },
          httpsAgent: agent
        })
      );
      return response.data;
    } catch (error) {
    }
  }
}
