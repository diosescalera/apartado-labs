import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbapiService } from '../service/dbapi.service';
import { HorarioProfesor } from '../interfaces/horarioProfesor';
import { Laboratorio } from '../interfaces/laboratorio';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-cargar-horario',
  imports: [CommonModule, FormsModule],
  templateUrl: './cargar-horario.component.html',
  styleUrl: './cargar-horario.component.css'
})
export class CargarHorarioComponent implements OnInit {
  horario: HorarioProfesor = {
    idhorario: 0,
    idlaboratorio: 0,
    idusuario: 0,
    hora_inicio: '',
    hora_cierre: '',
    dias: '',
    descripcion: ''
  };

  labs: Laboratorio[] = [];
  labsArray: string[] = [];
  labsId: Number[] = [];
  usuarios: Usuario[] = [];
  //vector para los checkboxes seleccionados
  diasSeleccionados: boolean[] = [false, false, false, false, false];


  constructor(private dbapiService: DbapiService) {}

  ngOnInit(): void {
    this.dbapiService.getUsers().subscribe({
      next: (response) => {
        this.usuarios = response.data.filter((user: any) => user.tipo === 'MAESTRO');
        console.log('Usuarios', this.usuarios);
      },
      error: (error) => {
        console.error('Error fetching usuarios', error);
      },
    });

    this.dbapiService.getLaboratorios().subscribe({
      next: (response) => {
        this.labs = response.data.map((lab: any) => ({
          ...lab,
          latitude: parseFloat(lab.latitude),
          longitude: parseFloat(lab.longitude),
        }));

        this.labsArray = this.labs.map(
          (lab) => `${lab.departamento} ${lab.num_ed} ${lab.aula ?? ''}`
        );

        this.labsId = this.labs.map((lab) => lab.idlaboratorio);
      },
      error: (error) => {
        console.error('Error fetching laboratorios', error);
      },
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.horario.dias = this.getSelectedDias();
    this.horario.hora_inicio = this.horario.hora_inicio + ':00';
    this.horario.hora_cierre = this.calculateHoraCierre(this.horario.hora_inicio)  + ':00';
    this.horario.idusuario = Number(this.horario.idusuario);

    const selectedIndex = Number(this.horario.idlaboratorio);
    if (selectedIndex >= 0 && selectedIndex < this.labs.length) {
      const selectedLab = this.labs[selectedIndex];
      this.horario.idlaboratorio = selectedLab.idlaboratorio;
    }
    console.log('Horario', this.horario);
    console.log('Formulario enviado', this.horario);

    this.dbapiService.cargarHorarioProfesor(this.horario).subscribe({
      next: (response) => {
        console.log('Horario cargado exitosamente', response);
      },
      error: (error) => {
        console.error('Error cargando horario', error);
      }
    });
  }

  calculateHoraCierre(horaInicio: string): string {
    const [hours, minutes] = horaInicio.split(':').map(Number);
    const date = new Date();
    date.setHours(hours + 1, minutes);
    return date.toTimeString().split(' ')[0].substring(0, 5);
  }

  getSelectedDias(): string {
    const dias = ['LU', 'MA', 'MI', 'JU', 'VI'];
    return dias.filter((dia, index) => this.diasSeleccionados[index]).join(',');
  }
}
