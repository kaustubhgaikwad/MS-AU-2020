import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let router = {
  navigate: jasmine.createSpy('navigate')
}

const authMock=jasmine.createSpyObj('AuthService', ['isAdmin','currentUser','isLoggedIn']);

fdescribe('AuthGuardService', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provider:AuthService,useValue:authMock},{ provide: Router, useValue: router },{provide:HttpClient,useClass:HttpClientTestingModule}]
    });
    service = TestBed.inject(AuthGuard);
  });

  // it('Testing authguard with logged in true', () => {

  //   authMock.isLoggedIn.and.returnValue(true);
  //   const result = service.canActivate(router, <RouterStateSnapshot>{url: 'testUrl'});
  //   expect(result).toBe(true);
  // });

  // it('Testing authguard with logged in false', () => {

  //   authMock.isLoggedIn.and.returnValue(false);
  //   expect(router.navigate).toHaveBeenCalledWith(['/login'],);


  //   //const result = service.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
  //   //expect(result).toBe(true);


  // });

});
