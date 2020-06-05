import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
class MockAuthService{
  isLoggedIn()
  {
    return true;
}
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let testBedService:AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent],
      providers:[{provide:AuthService,useClass:MockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //testBedService = TestBed.get(AuthService);
    expect(component).toBeTruthy();
  });

  it('Test for inject AuthService into home component', () => {



    // testBedService = TestBed.get(AuthService);
    // inject([AuthService],(injectService:AuthService)=>{
    //   expect(injectService).toBe(testBedService);
    // })
    // expect(component).toBeTruthy();
  });
});
