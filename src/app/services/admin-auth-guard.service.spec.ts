import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';



let router = {
  navigate: jasmine.createSpy('navigate')
}
const authMock = jasmine.createSpyObj('AuthService', ['isAdmin','currentUser']);

fdescribe('AdminAuthGuardService', () => {
  let service: AdminAuthGuard;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provide:AuthService,useValue:authMock},AdminAuthGuard,{ provide: Router, useValue: router },{provide:HttpClient,useClass:HttpClientTestingModule}]
    });
    service = TestBed.inject(AdminAuthGuard);
  });

  it('Testing Can activate with admin', () => {

    authMock.isAdmin.and.returnValue(true);
    authMock.currentUser.and.returnValue(true);

    const response = service.canActivate();
    expect(response).toBe(true);

    
    });
  
  it('Testing Can activate without admin ', () => {
   
    authMock.isAdmin.and.returnValue(false);
    authMock.currentUser.and.returnValue(true);

    expect(service.canActivate()).toBe(false);
    
    expect(router.navigate).toHaveBeenCalledWith(['/no-access']);
  });

});
