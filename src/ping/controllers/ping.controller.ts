// ping.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TrazasService } from '../../trazas/services/trazas.service';
import { DeviceService } from '../../devices/services/device.service';
import { SocketService } from '../../sockets/services/socket.service';
import { PingDto } from '../dtos/ping.dto';


@Controller('/ping')
export class PingController {
  constructor(
    private trazasService: TrazasService,
    private deviceService: DeviceService,
    private socketService: SocketService,
  ) {}

  @Post('transmitir')
  async recibirDatos(@Body() pingData: PingDto) {
    const { identificador, password, chapa, latitud, longitud } = pingData;
    const device = await this.deviceService.findIdentificador(identificador);
    if (!device || device.password !== password) { 
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const datos = { chapa, latitud, longitud };
    this.socketService.broadcast('movil-web', datos);
    await this.trazasService.createTrazas([{ chapa, latitud, longitud }]);
    
    return { message: 'Data processed successfully' };
  }
}
