import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/of';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ɵangular_packages_platform_browser_platform_browser_o } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthdXN0dWJoIEdhaWt3YWQiLCJhZG1pbiI6ZmFsc2V9.FMdnueT5XH56BvKHBfCE159IRywx4YxmekKvBrY43Ok'

const baseUrl = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http:HttpClient) { }
  public adminAccess:boolean;
  
  
  User :any;
  
  login_without_map(credentials){
    //return this.http.get(`${baseUrl}/${credentials.username}`).subscribe(

    //)
  }

  login(credentials){
    return this.http.get(`${baseUrl}/${credentials.username}`).map(
      data=>{
        this.User=data
        console.log("hello")
        if(!data)return false;
        console.log(data);
        if(credentials.password === this.User.password){
          console.log("credentials matched")
          localStorage.setItem('token',token);
          localStorage.setItem('admin',this.User.admin);
          localStorage.setItem('email',credentials.username);
          //localStorage.setItem('id',this.User.id);
          //this.adminAccess=this.User.admin;
          return true;
        }else{
          return false;
        }
      },error =>{
        alert(error);
      }
    )
   
  }

   logout(){
     if(localStorage.getItem('admin')==='false'){
      localStorage.removeItem('studentId');
     }
     localStorage.removeItem('token');
     localStorage.removeItem('admin');
     localStorage.removeItem('email');
     //localStorage.removeItem('id');
     this.router.navigate(['/']);

   }

   isLoggedIn(){
      return tokenNotExpired();
   }

   get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) console.log("token not found");
    if(!token) return null;
    return new JwtHelper().decodeToken(token);
  }

  isAdmin(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    if(localStorage.getItem('admin') === 'true' ){
      return true;
    }else{
      return false;
    }
  }

  googleSignIn(profile,googleUser){
      
      localStorage.setItem('token',googleUser.getAuthResponse().id_token);
      this.http.get(`${baseUrl}/${profile.getEmail()}`).subscribe(
        data=>{
            this.User = data;
            localStorage.setItem('admin',this.User.admin);
            localStorage.setItem('email',this.User.username);
            this.adminAccess=this.User.admin
        },error=>{
          alert(error);
        }
      )
      // if(profile.getEmail() === 'zarkmiles0101@gmail.com'){
      //   this.adminAccess=true;
      // }  else{
      //   this.adminAccess=false;
      // }
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        
  }


}
