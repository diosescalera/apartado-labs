import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbapiService } from '../service/dbapi.service';
import { Solicitudes } from '../interfaces/solicitudes';
import { EstadoPipe } from '../estado.pipe';
import { DataTablesModule } from 'angular-datatables';
import { Laboratorio } from '../interfaces/laboratorio';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, EstadoPipe, DataTablesModule],
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent implements OnInit {
  Solicitudes: Solicitudes[] = [];

  constructor(private dbapiService: DbapiService) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const idusuario = user.idusuario;
  
    this.dbapiService.getMisSolicitudes(idusuario).subscribe({
      next: (response) => {
        this.Solicitudes = response.data;
        console.log(this.Solicitudes);
      },
      error: (error) => {
        console.error('Error fetching misSolicitudes', error);
      }
    });
  }

  formatearHora(hora: string): string {
    if (!hora) return '';
    const [hh, mm] = hora.split(':');
    return `${hh}:${mm}`;
  }

  cancelarSolicitud(idprestamo: Number): void {
    this.dbapiService.cancelarSolicitud(idprestamo).subscribe({
      next: (response) => {
        console.log('Solicitud cancelada', response);
        const solicitud = this.Solicitudes.find(s => s.idprestamo === idprestamo);
        if (solicitud) {
          solicitud.estado = 'Cancelado';
        }
        this.Solicitudes = [...this.Solicitudes];
      },
      error: (error) => {
        console.error('Error cancelando solicitud', error);
      }
    });
  }
}