export interface Location {
    idlaboratorio: number;
    plantel: string;
    num_ed: string;
    aula: string | null;
    departamento: string;
    cupo: number;
    latitude: number;
    longitude: number;
    descripcion: string | null;
}
