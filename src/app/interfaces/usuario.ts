export interface Usuario {
    idusuario: number;
    nombre: string;
    apellido: string | null;
    carrera: string | null;
    correo: string;
    tipo: string;
    activo: number;
}
