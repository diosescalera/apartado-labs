export interface Laboratorio {
  idlaboratorio: number;
  plantel: string | null;
  num_ed: number;
  aula: string | null;
  departamento: string | null;
  cupo: number;
  latitude: number;
  longitude: number;
  descripcion: string | null;
}