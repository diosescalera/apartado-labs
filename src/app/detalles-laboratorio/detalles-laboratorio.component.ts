import { Component } from '@angular/core';
import { DbapiService } from '../service/dbapi.service';
import { Laboratorio } from '../interfaces/laboratorio';
import { HorarioProfesor } from '../interfaces/horarioProfesor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalles-laboratorio',
  imports: [CommonModule, FormsModule],
  templateUrl: './detalles-laboratorio.component.html',
  styleUrl: './detalles-laboratorio.component.css'
})
export class DetallesLaboratorioComponent  {
  laboratorios: Laboratorio[] = [];
  labsArray: string[] = [];
  labId = 0;
  labsId: Number[] = [];
  solicitud  = {
    idlaboratorio: 0,
    plantel: '',
    num_ed: 0,
    aula: '',
    departamento: '',
    cupo: 0,
    descripcion: '',
  };

  constructor(private dbapiService: DbapiService) {}

  ngOnInit() {
    this.dbapiService.getLaboratorios().subscribe({
      next: (response) => {
      this.laboratorios = response.data.map((lab: any) => ({
        ...lab
      }));
      this.labsArray = this.laboratorios.map(
        (lab) => `${lab.departamento} ${lab.num_ed} ${lab.aula ?? ''}`
      );
      this.labsId = this.laboratorios.map((lab) => lab.idlaboratorio);
      console.log(this.labsArray);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    console.log('Solicitud:', this.solicitud);
    this.dbapiService.updateLaboratorio(this.labId, this.solicitud).subscribe({
      next: (response) => {
        console.log('Laboratorio actualizado:', response);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  onLabChange(selectedIndex: number): void {
    if (selectedIndex >= 0 && selectedIndex < this.laboratorios.length) {
      const selectedLab = this.laboratorios[selectedIndex];
      this.labId = selectedLab.idlaboratorio;
      this.solicitud.idlaboratorio = selectedLab.idlaboratorio;
      this.solicitud.plantel = selectedLab.plantel ?? '';
      this.solicitud.num_ed = selectedLab.num_ed;
      this.solicitud.aula = selectedLab.aula ?? '';
      this.solicitud.departamento = selectedLab.departamento ?? '';
      this.solicitud.cupo = selectedLab.cupo;
      this.solicitud.descripcion = selectedLab.descripcion ?? '';
    }
  }

}
