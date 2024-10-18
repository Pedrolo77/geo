import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({schema: 'geolocalizacion'})
export class Parada extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

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