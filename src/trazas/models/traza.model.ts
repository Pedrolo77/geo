// traza.model.ts
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({schema: 'geolocalizacion'})
export class Traza extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  chapa: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  latitud: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  longitud: number;
}