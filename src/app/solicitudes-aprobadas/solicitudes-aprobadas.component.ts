import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { DbapiService } from '../service/dbapi.service';
import { Solicitudes } from '../interfaces/solicitudes';
import { CommonModule } from '@angular/common';
import { EstadoPipe } from '../estado.pipe';

@Component({
  selector: 'app-solicitudes-aprobadas',
  standalone: true,
  imports: [DataTablesModule, CommonModule, EstadoPipe],
  templateUrl: './solicitudes-aprobadas.component.html',
  styleUrl: './solicitudes-aprobadas.component.css'
})
export class SolicitudesAprobadasComponent implements OnInit {
  solicitudes: Solicitudes[] = [];

  constructor(private dbapiService: DbapiService) {}

  ngOnInit(): void {
    this.dbapiService.getPrestamos().subscribe({
      next: (response) => {
        this.solicitudes = response.data.filter((solicitud: Solicitudes) => solicitud.estado === 'A');
        console.log(this.solicitudes);
      },
      error: (error) => {
        console.error('Error fetching solicitudesAprobadas', error);
      }
    });
  }

  cancelarSolicitud(idprestamo: Number): void {
    this.dbapiService.cancelarSolicitud(idprestamo).subscribe({
      next: (response) => {
        console.log('Solicitud cancelada', response);
        const solicitud = this.solicitudes.find(s => s.idprestamo === idprestamo);
        if (solicitud) {
          solicitud.estado = 'Cancelado';
        }
        this.solicitudes = [...this.solicitudes];
      },
      error: (error) => {
        console.error('Error cancelando solicitud', error);
      }
    });
  }

  formatearHora(hora: string): string {
    if (!hora) return '';
    const [hh, mm] = hora.split(':');
    return `${hh}:${mm}`;
  }

  isCancelable(fecha: string, horainicio: string): boolean {
    const solicitudDateTime = new Date(fecha + 'T' + horainicio);
    const currentDateTime = new Date();
    return solicitudDateTime > currentDateTime;
  }

  finalizarSolicitud(id: Number) {
    this.dbapiService.finalizarSolicitud(id).subscribe({
      next: (response) => {
        console.log('Solicitud finalizada', response);
        const solicitud = this.solicitudes.find(s => s.idprestamo === id);
        if (solicitud) {
          solicitud.estado = 'Finalizado';
        }
        this.solicitudes = [...this.solicitudes];
      },
      error: (error) => {
        console.error('Error finalizando solicitud', error);
      }
    });

  }
}
