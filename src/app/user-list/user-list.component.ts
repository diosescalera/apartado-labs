import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbapiService } from '../service/dbapi.service';
import { Usuario } from '../interfaces/usuario';
import { DataTablesModule } from "angular-datatables";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {
  users: Usuario[] = [];

  constructor(private userService: DbapiService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
  }
}

