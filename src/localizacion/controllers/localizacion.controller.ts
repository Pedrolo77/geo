// localizacion.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { LocalizacionService } from '../services/localizacion.service';
import { ParadaDto } from '../dtos/parada.dto';
import { RutaDto } from '../dtos/ruta.dto';
import { ApiPermission, Permission } from '@raptorjs/polizei';

@Controller('/geolocalizacion')
@ApiPermission()
export class LocalizacionController {
  constructor(private readonly geolocalizacionService: LocalizacionService) {}

  @Post('parada')
  async crearParada(@Body() paradaData: ParadaDto) {
    return this.geolocalizacionService.createParada(paradaData);
  }

  @Post('ruta')
  async crearRuta(@Body() rutaData: RutaDto) {
    return this.geolocalizacionService.createRuta(rutaData);
  }

  @Get('parada')
  async obtenerParada(@Body('id') id: string) {
    return this.geolocalizacionService.obtenerParada(id);
  }

  @Delete('parada')
  async eliminarParada(@Body('id') id: string) {
    return this.geolocalizacionService.eliminarParada(id);
  }

  @Get('ruta')
  async obtenerRuta(@Body('id') id: string) {
    return this.geolocalizacionService.obtenerRuta(id);
  }

  @Delete('ruta')
  async eliminarRuta(@Body('id') id: string) {
    return this.geolocalizacionService.eliminarRuta(id);
  }
  
  @Post('edit-parada')
  async editarParada(@Body('id') id: string, @Body() paradaData: ParadaDto) {
    return this.geolocalizacionService.editarParada(id, paradaData);
  }

  @Post('edit-ruta')
  async editarRuta(@Body('id') id: string, @Body() rutaData: RutaDto) {
    return this.geolocalizacionService.editarRuta(id, rutaData);
  }
}
