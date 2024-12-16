import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DbapiService {
  private url = 'localhost'
  private port = '3000'
  private baseUrl = `http://${this.url}:${this.port}/`

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}usuario/get`);
  }

  gerLaboratorios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}laboratorio/get`);
  }

  }

