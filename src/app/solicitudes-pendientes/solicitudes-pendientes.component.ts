import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { DbapiService } from '../service/dbapi.service';
import { Solicitudes } from '../interfaces/solicitudes';
import { CommonModule } from '@angular/common';
import { EstadoPipe } from '../estado.pipe';

@Component({
  selector: 'app-solicitudes-pendientes',
  standalone: true,
  imports: [DataTablesModule, CommonModule, EstadoPipe],
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrl: './solicitudes-pendientes.component.css'
})
export class SolicitudesPendientesComponent implements OnInit {
  solicitudes: Solicitudes[] = [];

  constructor(private dbapiService: DbapiService) {}

  ngOnInit(): void {
    this.dbapiService.getPrestamos().subscribe({
      next: (response) => {
        this.solicitudes = response.data.filter((solicitud: Solicitudes) => solicitud.estado === 'P');
        console.log(this.solicitudes);
      },
      error: (error) => {
        console.error('Error fetching solicitudesPendientes', error);
      }
    });
  }

  aceptarSolicitud(idprestamo: Number): void {
    this.dbapiService.aceptarSolicitud(idprestamo).subscribe({
      next: (response) => {
        console.log('Solicitud aceptada', response);
        const solicitud = this.solicitudes.find(s => s.idprestamo === idprestamo);
        if (solicitud) {
          solicitud.estado = 'A';
        }
        this.solicitudes = [...this.solicitudes];
      },
      error: (error) => {
        console.error('Error aceptando solicitud', error);
      }
    });
  }

  formatearHora(hora: string): string {
    if (!hora) return '';
    const [hh, mm] = hora.split(':');
    return `${hh}:${mm}`;
  }

  rechazarSolicitud(idprestamo: Number): void {
    this.dbapiService.denegarSolicitud(idprestamo).subscribe({
      next: (response) => {
        console.log('Solicitud rechazada', response);
        const solicitud = this.solicitudes.find(s => s.idprestamo === idprestamo);
        if (solicitud) {
          solicitud.estado = 'D';
        }
        this.solicitudes = [...this.solicitudes];
      },
      error: (error) => {
        console.error('Error rechazando solicitud', error);
      }
    });
  }
}
