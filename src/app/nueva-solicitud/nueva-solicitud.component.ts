import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Laboratorio } from '../interfaces/laboratorio';
import { DbapiService } from '../service/dbapi.service';
import { event } from 'jquery';


@Component({
  selector: 'app-nueva-solicitud',
  imports: [CommonModule, FormsModule, GoogleMap, MapMarker],
  templateUrl: './nueva-solicitud.component.html',
  styleUrl: './nueva-solicitud.component.css'
})
export class NuevaSolicitudComponent {
  minDate!: string;
  errorMessage = '';
  successMessage = '';
  solicitud = {
    idlaboratorio: '',
    idusuario: 0,
    fecha: '',
    horainicio: '',
    duracion: 1,
    observaciones: ''
  };

//Declaraciones para el mapa
labs: Laboratorio[] = [];
markerPositions: google.maps.LatLngLiteral[] = [];
labsArray: string[] = []; // Nuevo arreglo para el select
labsId: string[] = [];

constructor(private dbapiService: DbapiService, private router: Router) {}


  ngOnInit(): void {
    const hoy = new Date();
    this.minDate = hoy.toISOString().split('T')[0];

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.solicitud.idusuario = Number(user.idusuario);

    //Obtener los laboratorios
    this.dbapiService.getLaboratorios().subscribe({
      next: (response) => {
        this.labs = response.data.map((lab: any) => ({
          ...lab,
          latitude: parseFloat(lab.latitude),
          longitude: parseFloat(lab.longitude),
        }));

        this.updateMarkers(); //Actualizar marcadores

        // Crear el arreglo formateado para el select
        this.labsArray = this.labs.map(
          (lab) => `${lab.departamento} ${lab.num_ed} ${lab.aula}`
        );

        this.labsId = this.labs.map((lab) => lab._id);
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
    });
  }

  onSubmit(event: Event): void {
    // Obtener el laboratorio seleccionado
    const selectedIndex = Number(this.solicitud.idlaboratorio);
    if (selectedIndex >= 0 && selectedIndex < this.labs.length) {
      const selectedLab = this.labs[selectedIndex];
      console.log('Laboratorio seleccionado:', selectedLab);

      // Puedes realizar cualquier operación adicional con `selectedLab` aquí
      this.solicitud.idlaboratorio = selectedLab._id; // Usar su ID para enviar al backend
    }
    this.solicitud.horainicio += ':00';
    console.log('Solicitud:', this.solicitud);
    event.preventDefault();
    
    this.dbapiService.crearSolicitud(this.solicitud).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.successMessage = 'Solicitud creada exitosamente.';
          setTimeout(() => {
            this.router.navigate(['/mis-solicitudes']);
          }, 3000);
        }
      },
      error: () => {
        this.errorMessage = 'Error al crear la solicitud.';
      },
    });
  }


  onLabChange(selectedIndex: number): void {
    if (selectedIndex >= 0 && selectedIndex < this.labs.length) {
      const selectedLab = this.labs[selectedIndex];
  
      // Actualizar el centro del mapa
      this.center = {
        lat: selectedLab.latitude,
        lng: selectedLab.longitude,
      };
  
      // Actualizar los marcadores para mostrar solo el seleccionado
      this.markerPositions = [
        {
          lat: selectedLab.latitude,
          lng: selectedLab.longitude,
        },
      ];
  
      console.log(`Laboratorio seleccionado:`, selectedLab);
    }
  }

/////// Configuraciones del mapa

// Función para actualizar los marcadores
updateMarkers() {
  this.markerPositions = this.labs.map((lab) => ({
    lat: lab.latitude,
    lng: lab.longitude,
  }));
  console.log('Marcadores actualizados:', this.markerPositions);
}

//Configuración del mapa
center: google.maps.LatLngLiteral = {
  lat: 21.9138815785422,
  lng: -102.31551702899552,
};
zoom = 17;
display: google.maps.LatLngLiteral = this.center;
markerOptions: google.maps.MarkerOptions = { draggable: false };

//Impresión del mapa
moveMap(event: google.maps.MapMouseEvent) {
  this.center = event.latLng!.toJSON();
}

move(event: google.maps.MapMouseEvent) {
  this.display = event.latLng!.toJSON();
}

//Marcadores personalizados
customIcon = {
  url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png',
  scaledSize: {
    width: 22,
    height: 40,
  },
};

//Agregar marcadores
addMarker(event: google.maps.MapMouseEvent) {
  this.markerPositions.push(event.latLng!.toJSON());
}

}
