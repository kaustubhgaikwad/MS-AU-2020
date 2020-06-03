import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SidebarModule } from 'ng-sidebar';
@Component({
  selector: 'admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  public _opened: boolean = false;

   _toggleSidebar() {
    this._opened = !this._opened;
  }

}
