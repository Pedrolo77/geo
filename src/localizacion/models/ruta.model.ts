// ruta.model.ts
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({schema: 'geolocalizacion'})
export class Ruta extends Model {
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
    type: DataType.JSON,
    allowNull: false,
  })
  puntos: { latitud: number, longitud: number }[];
}