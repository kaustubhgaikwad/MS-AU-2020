import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UserNameValidators } from './username.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  isAdmin:boolean;

  // form = new FormGroup({
  //   account: new FormGroup({
  //     username: new FormControl('',[
  //       Validators.required,
  //       Validators.minLength(3),
  //       UserNameValidators.cannotContainSpace, 
  //     ]),
  //     password: new FormControl('',Validators.required)
    
  //   })
  //   });

  constructor(
    private router: Router,
    private route:ActivatedRoute, 
    private authService: AuthService,
    private ngZone:NgZone ) { }

    auth2:any;
    @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  signIn(credentials){
    console.log("asda="+credentials)
    this.authService.login(credentials)
       .subscribe(result => { 
         if (result){
           let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
           this.isAdmin=this.authService.isAdmin();
           if(this.isAdmin)
           this.router.navigate([returnUrl || '/admin']);
           else{
             this.router.navigate(['/student']);
           }
       }else  
           this.invalidLogin = true; 
       });
    //console.log(this.form.get('account.username'));
  }

  
  ngOnInit() {
    this.googleSDK();
  }
 
  prepareLoginButton() {
    console.log("Inside prepareLoginButton()")
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => this.ngZone.run(()=>{
        console.log("porfile");
        let profile = googleUser.getBasicProfile();
        this.authService.googleSignIn(profile,googleUser);
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.isAdmin=this.authService.adminAccess
        if(this.isAdmin)
          this.router.navigate(['/admin']);
          else{
            console.log("student signed with google");
            this.router.navigate(['/student']);
          }
        //YOUR CODE HERE
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }));
 
  }

  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '503048469827-v8jbun9h0r08cokvg4gsmjmub2al3eg4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        //this.ngZone.run(()=>this.prepareLoginButton());
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
  }
}
