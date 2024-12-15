import { Component } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  imports: [GoogleMap, MapMarker],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  center: google.maps.LatLngLiteral = {
    lat: 21.9138815785422,
    lng: -102.31551702899552,
  };
  zoom = 17;
  display: google.maps.LatLngLiteral = this.center;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  // Posiciones iniciales de marcadores
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 21.913545970238864, lng: -102.31628707072989 }, // 54H
    { lat: 21.913545970238864, lng: -102.31628707072989 }, // 54I
    { lat: 21.913192982752733, lng: -102.31646673605793 }, // 57A
  ];

  canAddMarkers = false; // Controla si se pueden agregar marcadores

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
