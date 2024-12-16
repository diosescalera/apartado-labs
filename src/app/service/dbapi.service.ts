import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbapiService {
  private adminRoles = ['RESPONSABLE', 'AYUDANTE'];
  private isLoggedIn = false;
  private isAdmin = false;
  private url = 'localhost'
  private port = '3000'
  private baseUrl = `http://${this.url}:${this.port}/`
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

  // Obtener solicitudes de un usuario
  getMisSolicitudes(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get/usuario/${id}`);
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
