import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

class MockService{
  call(){
    return "hello";
  }
  currentUser={
    name:"Kaustubh"
  }
  isAdmin(){
    console.log("checking is admin")
    return true;
  }
}

let router = {
  navigate: jasmine.createSpy('navigate')
}

fdescribe('AdminAuthGuardService', () => {
  let service: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provider:AuthService,useClass:MockService},AdminAuthGuard,{ provide: Router, useValue: router },{provide:HttpClient,useClass:HttpClientTestingModule}]
    });
    service = TestBed.inject(AdminAuthGuard);
  });

  it('Testing Can activate with admin', () => {
    spyOn(service,'canActivate').and.callFake(()=>{
      return true;
    })
    expect(service.canActivate()).toBe(true);
    
    });
  
  it('Testing Can activate without admin ', () => {
   
    expect(service.canActivate()).toBe(false);
    
    expect(router.navigate).toHaveBeenCalledWith(['/no-access']);
  });

});
