import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DbapiService {
  private ip = '192.168.50.28'
  private port = '3000'
  private baseUrl = `http://${this.ip}:${this.port}/glem/`

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}usuario/find`);
  }
}
