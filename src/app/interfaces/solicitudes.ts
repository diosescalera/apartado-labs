export interface Solicitudes {
    idprestamo: number;
    idlaboratorio: number;
    idusuario: number;
    fecha: string;
    horaInicio: string;
    duracion: number;
    observaciones: string | null;
    estado: string;
    departamento: string;
    num_ed: string;
    aula: string | null;
};