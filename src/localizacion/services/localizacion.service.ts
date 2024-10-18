// localizacion.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel, getConnectionToken } from '@nestjs/sequelize';
import { Parada } from '../models/parada.model';
import { Ruta } from '../models/ruta.model';
import { ParadaDto } from '../dtos/parada.dto';
import { RutaDto } from '../dtos/ruta.dto';

@Injectable()
export class LocalizacionService {
  constructor(
    @InjectModel(Parada, 'DefaultConnection') // Inyecta la conexión 'MapsConnection'
    private paradaModel: typeof Parada,
    @InjectModel(Ruta, 'DefaultConnection') // Inyecta la conexión 'MapsConnection'
    private rutaModel: typeof Ruta,
  ) {}

  async createParada(paradaData: ParadaDto): Promise<Parada> {
    return this.paradaModel.create(paradaData as any);
  }

  async createRuta(rutaData: RutaDto): Promise<Ruta> {
    return this.rutaModel.create(rutaData as any);
  }
  

  async obtenerParada(id: string): Promise<Parada> {
    return this.paradaModel.findOne({ where: { id } });
  }
  async eliminarParada(id: string): Promise<void> {
    const parada = await this.obtenerParada(id);
    if (parada) {
      await parada.destroy();
    }
  }

  async obtenerRuta(id: string): Promise<Ruta> {
    return this.rutaModel.findOne({ where: { id } });
  }


  async eliminarRuta(id: string): Promise<void> {
    const ruta = await this.obtenerRuta(id);
    if (ruta) {
      await ruta.destroy();
    }
  }

  async editarParada(id: string, paradaData: ParadaDto): Promise<Parada> {
    const parada = await this.paradaModel.findOne({ where: { id } });
    return parada.update(paradaData);
  }

  async editarRuta(id: string, rutaData: RutaDto): Promise<Ruta> {
    const ruta = await this.rutaModel.findOne({ where: { id } });
    return ruta.update(rutaData);
  }

}
