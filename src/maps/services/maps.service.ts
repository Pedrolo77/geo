// maps.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { getConnectionToken } from '@nestjs/sequelize';

@Injectable()
export class MapsService {
  constructor(
    @Inject(getConnectionToken('MapsConnection'))
    private readonly sequelize: Sequelize,
  ) {}

  async findTile(x: number, y: number, z: number): Promise<any> {
    try {
      y = (Math.pow(2, z) - 1 - y);
      const query = `SELECT tile_data FROM tiles WHERE zoom_level = ${z} AND tile_column = ${x} AND tile_row = ${y}`;
      const tile = await this.sequelize.query(query);
      const tileData = (tile[0][0] as any).tile_data;
      return tileData;
    } catch (error) {
      console.error(error);
      return error;
      // return new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
