import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/of';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ɵangular_packages_platform_browser_platform_browser_o } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:Http,private router: Router,) { }

  adminAccess:boolean;
  
  login(credentials) { 
    return this.http.post('/api/authenticate', 
       JSON.stringify(credentials))
        .map(response =>{ 
          let result = response.json();
          console.log(response.json());
          if(result && result.token){
            localStorage.setItem('token',result.token);
            if(new JwtHelper().decodeToken(result.token).admin){
              this.adminAccess=true
            }else{
              this.adminAccess=false;
            }
            return true;
          }
          return false;
        })     
   }

   logout(){
     localStorage.removeItem('token');
     this.router.navigate(['/']);
   }

   isLoggedIn(){
      return tokenNotExpired();
   }

   get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    return new JwtHelper().decodeToken(token);
  }

  isAdmin(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    return this.adminAccess;
  }

  googleSignIn(profile,googleUser){
      
      localStorage.setItem('token',googleUser.getAuthResponse().id_token);
      
      if(profile.getEmail() === 'zarkmiles0101@gmail.com'){
        this.adminAccess=true;
      }  else{
        this.adminAccess=false;
      }
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        
  }


}
