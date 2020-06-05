import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let router = {
  navigate: jasmine.createSpy('navigate')
}

class MockService{

  isLoggedIn(){
    console.log("asds");
    return true;
  }

};

describe('AuthGuardService', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provider:AuthService,useClass:MockService},{ provide: Router, useValue: router },{provide:HttpClient,useClass:HttpClientTestingModule}]
    });
    service = TestBed.inject(AuthGuard);
  });

  it('Testing authguard', () => {
    spyOn(service,'canActivate').and.callFake(()=>{
      return true;
    })
    expect(service.canActivate).toBe(false);
  });
});
