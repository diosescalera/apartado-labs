import { Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { LoginComponent } from "./login/login.component";
import { NuevaSolicitudComponent } from "./nueva-solicitud/nueva-solicitud.component";
import { MisSolicitudesComponent } from "./mis-solicitudes/mis-solicitudes.component";
import { SolicitudesPendientesComponent } from "./solicitudes-pendientes/solicitudes-pendientes.component";
import { SolicitudesAprobadasComponent } from "./solicitudes-aprobadas/solicitudes-aprobadas.component";
import { CargarHorarioComponent } from "./cargar-horario/cargar-horario.component";
import { NuevoMaterialComponent } from "./nuevo-material/nuevo-material.component";
import { GestionarInventarioComponent } from "./gestionar-inventario/gestionar-inventario.component";
import { DetallesLaboratorioComponent } from "./detalles-laboratorio/detalles-laboratorio.component";
import { MapComponent } from "./map/map.component";

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'nueva-solicitud', component: NuevaSolicitudComponent },
    { path: 'mis-solicitudes', component: MisSolicitudesComponent },
    { path: 'solicitudes-pendientes', component: SolicitudesPendientesComponent },
    { path: 'solicitudes-aprobadas', component: SolicitudesAprobadasComponent },
    { path: 'cargar-horario', component: CargarHorarioComponent },
    { path: 'nuevo-material', component: NuevoMaterialComponent },
    { path: 'gestionar-inventario', component: GestionarInventarioComponent },
    { path: 'detalles-laboratorio', component: DetallesLaboratorioComponent },
    { path: 'map', component: MapComponent },
];
