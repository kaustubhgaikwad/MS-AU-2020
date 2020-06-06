import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavBarComponent } from './admin-nav-bar.component';
import { AuthService } from '../services/auth.service';

class MockAuthService{

}

describe('AdminNavBarComponent', () => {
  let component: AdminNavBarComponent;
  let fixture: ComponentFixture<AdminNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[{provide:AuthService,useClass:MockAuthService}],
      declarations: [ AdminNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

  });

});
