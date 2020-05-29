import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router'; 
import { fakeBackendProvider } from './helper/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './services/auth.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { StudentAuthGuard } from './services/student-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'admin',
       component: AdminComponent ,
       canActivate: [AuthGuard,AdminAuthGuard]
     },
     {
      path: 'student',
     component: StudentComponent ,
     canActivate: [AuthGuard,StudentAuthGuard]
   },
   { path: 'no-access', component: NoAccessComponent }
    ])
    
  ],
  providers: [  
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
