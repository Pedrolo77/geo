import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({schema: 'geolocalizacion'})
export class DeviceModel extends Model<DeviceModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
   
  @Column
  identificador: string;
  
  @Column
  marca: string;

  @Column
  password: string;

  @Column
  idScope: number;
}
