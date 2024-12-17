import { Laboratorio } from "./laboratorio";

export interface Solicitudes {
    idprestamo: number;
    idlaboratorio: number;
    idusuario: number;
    fecha: Date;
    horainicio: string;
    duracion: number;
    observaciones: string | null;
    estado: string;
    laboratorio: Laboratorio;
};