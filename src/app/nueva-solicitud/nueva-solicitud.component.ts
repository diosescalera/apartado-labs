import { Component } from '@angular/core';

@Component({
  selector: 'app-nueva-solicitud',
  imports: [],
  templateUrl: './nueva-solicitud.component.html',
  styleUrl: './nueva-solicitud.component.css'
})
export class NuevaSolicitudComponent {
  minDate!: string;

  ngOnInit(): void {
    const hoy = new Date();
    this.minDate = hoy.toISOString().split('T')[0];
  }
}
