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

import { HttpClientModule } from '@angular/common/http';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { StudentNavBarComponent } from './student-nav-bar/student-nav-bar.component';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoAccessComponent,
    AdminComponent,
    AddAssignmentComponent,
    AssignmentListComponent,
    AssignmentDetailsComponent,
    AdminNavBarComponent,
    StudentNavBarComponent,
    SubmitAssignmentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AgGridModule.withComponents([]),
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
   { path: 'no-access', component: NoAccessComponent },
  { path: 'admin/assignments', component: AssignmentListComponent,canActivate:[AuthGuard] },
  { path: 'admin/assignments/add', component: AddAssignmentComponent ,canActivate:[AuthGuard] },
  { path: 'admin/assignments/:id', component: AssignmentDetailsComponent,canActivate:[AuthGuard]  },
  { path: 'student/assignments', component: AssignmentListComponent ,canActivate:[AuthGuard] },
  { path: 'student/assignments/:id', component: SubmitAssignmentComponent,canActivate:[AuthGuard]  }
    ])
    
  ],
  providers: [  
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    StudentAuthGuard
    // fakeBackendProvider,
    // MockBackend,
    //BaseRequestOptions
  ],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
