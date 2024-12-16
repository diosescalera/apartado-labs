import { Laboratorio } from "./laboratorio";

export interface Solicitudes {
    _id: string;
    idlaboratorio: string;
    idusuario: number;
    fecha: Date;
    horainicio: string;
    duracion: number;
    observaciones: string;
    estado: string;
    laboratorio: Laboratorio;
};