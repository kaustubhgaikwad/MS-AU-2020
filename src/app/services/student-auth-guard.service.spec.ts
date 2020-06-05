import { TestBed } from '@angular/core/testing';

import { StudentAuthGuard } from './student-auth-guard.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let router = {
  navigate: jasmine.createSpy('navigate')
}

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

fdescribe('StudentAuthGuardService', () => {
  let service: StudentAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provider:AuthService,useClass:MockService},StudentAuthGuard,{ provide: Router, useValue: router },{provide:HttpClient,useClass:HttpClientTestingModule}]
    });
    service = TestBed.inject(StudentAuthGuard);
  });

  it('Testing student auth guard with student', () => {
    spyOn(service,'canActivate').and.callFake(()=>{
      return true;
    })
    expect(service.canActivate()).toBe(true);
  });

  it('Testing student auth guard without student', () => {
    expect(service.canActivate()).toBe(false);
    
    expect(router.navigate).toHaveBeenCalledWith(['/no-access']);
  });

});
