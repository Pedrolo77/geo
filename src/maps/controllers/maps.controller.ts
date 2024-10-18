// maps.controller.ts
import { Controller, Post, Body, Res, NotFoundException } from '@nestjs/common';
import { MapsService } from '../services/maps.service';
import { createGzip } from 'zlib';
import { Response } from 'express';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post('tile')
  async getTile(@Body('x') x: number, @Body('y') y: number, @Body('z') z: number, @Res() res: Response) {
    try {
      const tileData = await this.mapsService.findTile(x, y, z);
      if (!tileData) {
        throw new NotFoundException('Tile not found');
      }
      const gzip = createGzip();
      let compressedTileData = Buffer.alloc(0);
  
      gzip.on('data', (chunk) => {
        compressedTileData = Buffer.concat([compressedTileData, chunk]);
      });
  
      gzip.on('end', () => {
        res.setHeader('Content-type', 'application/x-protobuf');
        res.setHeader('Content-Encoding', 'gzip');
        res.send(compressedTileData);
      });
  
      gzip.write(tileData);
      gzip.end();
    } catch (error) {
      console.error(error);
    }
  }
  
}
