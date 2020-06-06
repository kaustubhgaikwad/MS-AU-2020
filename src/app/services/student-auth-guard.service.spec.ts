import { TestBed } from '@angular/core/testing';

import { StudentAuthGuard } from './student-auth-guard.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let router = {
  navigate: jasmine.createSpy('navigate')
}
const authMock = jasmine.createSpyObj('AuthService', ['isAdmin','currentUser']);


fdescribe('StudentAuthGuardService', () => {
  let service: StudentAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provider:AuthService,useValue:authMock},StudentAuthGuard,{ provide: Router, useValue: router },{provide:HttpClient,useClass:HttpClientTestingModule}]
    });
    service = TestBed.inject(StudentAuthGuard);
  });

  // it('Testing student auth guard with student', () => {
    
  //   authMock.isAdmin.and.returnValue(false);
  //   authMock.currentUser.and.returnValue(true);
  //   const response = service.canActivate();
  //   expect(response).toBe(true);
 
  // });

  it('Testing student auth guard without student', () => {
    authMock.isAdmin.and.returnValue(true);
    authMock.currentUser.and.returnValue(true);
    expect(service.canActivate()).toBe(false);
    
    expect(router.navigate).toHaveBeenCalledWith(['/no-access']);
  });

});
