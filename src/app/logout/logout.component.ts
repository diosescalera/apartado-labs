import { Component } from '@angular/core';
import { DbapiService } from '../service/dbapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private dbapiService: DbapiService, private router: Router) {}

  onLogout(event: Event): void {
    event.preventDefault();
    const token = localStorage.getItem('token') || '';
    this.dbapiService.logout(token).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.dbapiService.setLoginStatus(false,false);
          localStorage.clear();
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
