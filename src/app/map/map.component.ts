import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Laboratorio } from '../interfaces/laboratorio';
import { DbapiService } from '../service/dbapi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  //Obtener laboratorios
  labs: Laboratorio[] = [];
  markerPositions: google.maps.LatLngLiteral[] = [];
  labsArray: string[] = []; // Nuevo arreglo para el select

  constructor(private labService: DbapiService) {}

  ngOnInit(): void {
    this.labService.getLaboratorios().subscribe({
      next: (response) => {
        console.log('Laboratorios recibidos:', response.data); // Imprimir laboratorios
        this.labs = response.data.map((lab: any) => ({
          ...lab,
          latitude: parseFloat(lab.latitude),
          longitude: parseFloat(lab.longitude),
        }));
        console.log('Laboratorios GUARDADOS:', this.labs); // Imprimir laboratorios

        this.updateMarkers(); //Actualizar marcadores

        // Crear el arreglo formateado para el select
        this.labsArray = this.labs.map(
          (lab) => `${lab.departamento} ${lab.num_ed} ${lab.aula}`
        );
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
    });
  }

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
}
