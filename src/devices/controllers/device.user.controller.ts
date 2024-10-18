// device.controller.ts
import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { DeviceDto } from '../dtos/device.dto';
import { GetCurrentScope, Permission, UserToken } from '@raptorjs/polizei';

@Permission()
@Controller('devices-user')
export class DeviceUserController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('register')
  async create(@Body() deviceData: DeviceDto, @GetCurrentScope() scope: any) {
    const deviceDataWithScope = { ...deviceData, scope };
    return this.deviceService.create(deviceDataWithScope);
  }

  @Post('find')
  async findOne(@Body('id') id: string) {
    return this.deviceService.findOne(id);
  }

  @Post('edit')
  async update(@Body('id') id: string, @Body() deviceData: DeviceDto) {
    return this.deviceService.update(id, deviceData);
  }

  @Post('delete')
  async delete(@Body('id') id: string, ) {
    this.deviceService.delete(id);
  }
}
