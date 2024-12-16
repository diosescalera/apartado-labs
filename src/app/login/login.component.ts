import { Component } from '@angular/core';
import { DbapiService } from '../service/dbapi.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  password = '';
  errorMessage = '';

  constructor(private dbapiService: DbapiService, private router: Router) {}

  onLogin(event: Event): void {
    event.preventDefault();
    this.dbapiService.login(this.correo, this.password).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.dbapiService.setLoginStatus(true);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.errorMessage = 'Error en el inicio de sesión.';
      }
    });
  }
}
