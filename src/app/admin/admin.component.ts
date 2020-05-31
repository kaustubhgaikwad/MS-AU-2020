import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin:any;
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.admin=this.authService.isAdmin();
  }

}
