import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/sequelize';
import { Traza } from '../models/traza.model';
import { Cron } from '@nestjs/schedule';
import { Op } from 'sequelize';

@Injectable()
export class TrazasService {
  constructor(
    @InjectModel(Traza, 'DefaultConnection') 
    private trazaModel: typeof Traza,
  ) {}

  async createTrazas(trazas: { chapa: string, latitud: number, longitud: number }[]): Promise<Traza[]> {
    return this.trazaModel.bulkCreate(trazas);
  }

  async findTrazas(chapa: string): Promise<Traza[]> {
    return this.trazaModel.findAll({
      where: {
        chapa: chapa
      }
    });
  }

  @Cron('0 0 * * *') 
  async deleteOldTrazas(): Promise<number> {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    return this.trazaModel.destroy({
      where: {
        createdAt: {
          [Op.lt]: twoDaysAgo
        }
      }
    });
  }
}
