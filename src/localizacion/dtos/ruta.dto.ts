
export class RutaDto {
  readonly nombre: string;
  readonly puntos: { latitud: number, longitud: number }[];
}