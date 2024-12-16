import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbapiService } from '../service/dbapi.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private labService: DbapiService) {}

  ngOnInit(): void {
    this.labService.getLoginStatus().subscribe({
      next: (response) => {
        this.isLoggedIn = response;
      },
      error: (error) => {
        console.error('Error fetching login status', error);
      },
    });

    this.labService.getAdminStatus().subscribe({
      next: (response) => {
        this.isAdmin = response;
      },
      error: (error) => {
        console.error('Error fetching admin status', error);
      },
    });
    
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
