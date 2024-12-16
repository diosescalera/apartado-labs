import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbapiService {
  private url = 'localhost'
  private port = '3000'
  private baseUrl = `http://${this.url}:${this.port}/`

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}usuario/get`);
  }

  getLaboratorios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}laboratorio/get`);
  }

  // Obtener solicitudes de un usuario
  getMisSolicitudes(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get/usuario/${id}`);
  }

}
