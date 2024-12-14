import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NuevaSolicitudComponent } from "./nueva-solicitud/nueva-solicitud.component";
import { MisSolicitudesComponent } from "./mis-solicitudes/mis-solicitudes.component";
import { SolicitudesPendientesComponent } from "./solicitudes-pendientes/solicitudes-pendientes.component";
import { SolicitudesAprobadasComponent } from "./solicitudes-aprobadas/solicitudes-aprobadas.component";
import { CargarHorarioComponent } from "./cargar-horario/cargar-horario.component";
import { GestionarInventarioComponent } from "./gestionar-inventario/gestionar-inventario.component";
import { DetallesLaboratorioComponent } from "./detalles-laboratorio/detalles-laboratorio.component";

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'nueva-solicitud', component: NuevaSolicitudComponent },
    { path: 'mis-solicitudes', component: MisSolicitudesComponent },
    { path: 'solicitudes-pendientes', component: SolicitudesPendientesComponent },
    { path: 'solicitudes-aprobadas', component: SolicitudesAprobadasComponent },
    { path: 'cargar-horario', component: CargarHorarioComponent },
    { path: 'gestionar-inventario', component: GestionarInventarioComponent },
    { path: 'detalles-laboratorio', component: DetallesLaboratorioComponent },
];
