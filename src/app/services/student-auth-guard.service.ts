import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard  implements CanActivate {

  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  canActivate(){
    let user = this.authService.currentUser;
    let admin = this.authService.isAdmin()
    console.log("Inside student guard: "+" user= "+ user +" admin= "+admin)
    if(user && !admin ) return true;

    this.router.navigate(['/no-access']);
    return false;

  }

}

