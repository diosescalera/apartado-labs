import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NuevaSolicitudComponent } from "./nueva-solicitud/nueva-solicitud.component";
import { CargarHorarioComponent } from "./cargar-horario/cargar-horario.component";
import { GestionarInventarioComponent } from "./gestionar-inventario/gestionar-inventario.component";

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'nueva-solicitud', component: NuevaSolicitudComponent },
    { path: 'cargar-horario', component: CargarHorarioComponent },
    { path: 'gestionar-inventario', component: GestionarInventarioComponent },
];
