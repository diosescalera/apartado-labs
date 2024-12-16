import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HorarioProfesor } from '../interfaces/horarioProfesor';

@Injectable({
  providedIn: 'root'
})
export class DbapiService {
  private adminRoles = ['RESPONSABLE', 'AYUDANTE'];
  private isLoggedIn = false;
  private isAdmin = false;
  private url = 'nq6pfh4p-4000.usw3.devtunnels.ms'
  private baseUrl = `https://${this.url}/`
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin);

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}usuario/get`);
  }

  getLaboratorios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}laboratorio/get`);
  }

  updateLaboratorio(id: string, laboratorio: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}laboratorio/update/${id}`, laboratorio);
  }

  //Obtener todos los prestamos
  getPrestamos():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}prestamo/get`);
  }

  // Obtener solicitudes de un usuario
  getMisSolicitudes(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}prestamo/get/usuario/${id}`);
  }

  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}prestamo/create`, solicitud);
  }

  // Cancelar una solicitud
  cancelarSolicitud(idprestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}prestamo/delete/${idprestamo}/C`);
  }

  finalizarSolicitud(idprestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}prestamo/delete/${idprestamo}/F`);
  }

  denegarSolicitud(idprestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}prestamo/delete/${idprestamo}/D`);
  }

  aceptarSoliciturd(idprestamo: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}prestamo/update/${idprestamo}`, {estado: 'A'});
  }

  cargarHorarioProfesor(horairo: HorarioProfesor): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}horarioProfesores/create`, horairo);
  }

  // Login
  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { correo, password });
  }
  
  // Logout
  logout(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/logout`, {
      headers: { 'x-access-token': token }
    });
  }

  getLoginStatus(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    if (token) {
      this.http.get<any>(`${this.baseUrl}auth/decode`, {
        headers: { 'x-access-token': token }
      }).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.isLoggedIn = true;
            this.isAdmin = this.adminRoles.includes(response.data.tipo);
            this.isLoggedInSubject.next(true);
            this.isAdminSubject.next(this.isAdmin);
          }
        },
        error: (error) => {
          localStorage.clear();
          this.isLoggedIn = false;
          this.isAdmin = false;
          this.isLoggedInSubject.next(false);
          this.isAdminSubject.next(false);
        },
      });
    }
    return this.isLoggedInSubject.asObservable();
  }

  getAdminStatus(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  setLoginStatus(status: boolean, isAdmin: boolean): void {
    this.isLoggedIn = status;
    this.isLoggedInSubject.next(status);
    this.isAdmin = isAdmin;
    this.isAdminSubject.next(isAdmin);
  }
}
