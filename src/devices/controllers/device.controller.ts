// device.controller.ts
import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { DeviceDto } from '../dtos/device.dto';
import { ApiPermission, Permission, RootScope } from '@raptorjs/polizei';

@ApiPermission()
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService ) {}

  @Post('register')
  async create(@Body() deviceData: DeviceDto,  @RootScope() scope:any) {
    const deviceDataWithScope = { ...deviceData, scope };
    return this.deviceService.create(deviceDataWithScope);
  }

  @Post('list')
  async findAll(@RootScope() scope:any) {
    return this.deviceService.findAll(scope);
  }
  
  @Post('find-identificador')
  async findIdentificador(@Body('identificador') identificador: string) {
    return this.deviceService.findIdentificador(identificador);
  }

  @Post('edit')
  async update(@Body('id') id: string, @Body() deviceData: DeviceDto) {
    return this.deviceService.update(id, deviceData);
  }

  @Post('delete')
  async delete(@Body('id') id: string) {
    this.deviceService.delete(id);
  }
}
