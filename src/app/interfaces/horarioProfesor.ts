export interface HorarioProfesor {
  idhorario: number;
  idlaboratorio: number;
  idusuario: number;
  hora_inicio: string;
  hora_cierre: string;
  dias: string;
  descripcion: string | null;
}