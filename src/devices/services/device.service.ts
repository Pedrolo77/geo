// device.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { DeviceModel } from '../models/device.model';
import { InjectModel, getConnectionToken } from '@nestjs/sequelize';
import { DeviceDto } from '../dtos/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(DeviceModel, 'DefaultConnection') // Inyecta la conexión 'DefaultConnection'
    private devicemodel: typeof DeviceModel,
  ) { }

  async create(deviceData: DeviceDto) {
    return await this.devicemodel.create(deviceData);
  }

  async findAll(idScope: number) {
    return await this.devicemodel.findAll({ where: { idScope } });
  }

  async findOne(id: string) {
    return await this.devicemodel.findOne({ where: { id } });
  }

  async findIdentificador(identificador: string) {
    return await this.devicemodel.findOne({ where: { identificador } });
  }

  async update(id: string, deviceData: DeviceDto) {
    const device = await this.findOne(id);
    return await device.update(deviceData);
  }

  async delete(id: string) {
    const device = await this.findOne(id);
    await device.destroy();
  }
}
