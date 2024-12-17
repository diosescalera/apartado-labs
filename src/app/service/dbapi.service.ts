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
  private port = 3000;
  private url = 'http://localhost';
  private baseUrl = `${this.url}:${this.port}/`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin);

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  // Endpoint backend: /usuario/get
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}usuario/get`);
  }

  // Obtener todos los laboratorios
  // Endpoint backend: /laboratorio/get
  getLaboratorios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}laboratorio/get`);
  }

  // Actualizar un laboratorio existente
  // Endpoint backend: /laboratorio/update/:id
  updateLaboratorio(id: string, laboratorio: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}laboratorio/update/${id}`, laboratorio);
  }

  // Obtener todos los préstamos
  // Endpoint backend: /prestamo/get
  getPrestamos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}prestamo/get`);
  }

  // Obtener los préstamos de un usuario específico
  // Endpoint backend: /prestamo/get/usuario/:idusuario
  getMisSolicitudes(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}prestamo/get/usuario/${id}`);
  }

  // Crear una nueva solicitud de préstamo
  // Endpoint backend: /prestamo/create
  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}prestamo/create`, solicitud);
  }

  // Cancelar una solicitud de préstamo (cambiar estado a "Cancelado")
  // Endpoint backend: /prestamo/delete/:id/:estado
  cancelarSolicitud(idprestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}prestamo/delete/${idprestamo}/C`);
  }

  // Finalizar una solicitud de préstamo (cambiar estado a "Finalizado")
  // Endpoint backend: /prestamo/delete/:id/:estado
  finalizarSolicitud(idprestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}prestamo/delete/${idprestamo}/F`);
  }

  // Denegar una solicitud de préstamo (cambiar estado a "Denegado")
  // Endpoint backend: /prestamo/delete/:id/:estado
  denegarSolicitud(idprestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}prestamo/delete/${idprestamo}/D`);
  }

  // Aceptar una solicitud de préstamo (cambiar estado a "Aceptado")
  // Endpoint backend: /prestamo/update/:id
  aceptarSolicitud(idprestamo: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}prestamo/update/${idprestamo}`, { estado: 'A' });
  }

  // Crear un horario para un profesor
  // Endpoint backend: /horarioProfesores/create
  cargarHorarioProfesor(horario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}horarioProfesores/create`, horario);
  }

  // Login de usuario
  // Endpoint backend: /auth/login
  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { correo, password });
  }

  // Logout del usuario
  // Endpoint backend: /auth/logout
  logout(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/logout`, {
      headers: { 'x-access-token': token }
    });
  }

  // Obtener el estado de inicio de sesión decodificando el token
  // Endpoint backend: /auth/decode
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

  // Cambiar estado de administrador
  getAdminStatus(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  // Establecer manualmente el estado de inicio de sesión y administrador
  setLoginStatus(status: boolean, isAdmin: boolean): void {
    this.isLoggedIn = status;
    this.isLoggedInSubject.next(status);
    this.isAdmin = isAdmin;
    this.isAdminSubject.next(isAdmin);
  }
}