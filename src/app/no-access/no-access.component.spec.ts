import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessComponent } from './no-access.component';
import { StudentService } from '../services/student.service';
import { of } from 'rxjs/internal/observable/of';

  class MockStudentService{
    getStudent(email){
      console.log("chal gaya");
      return of("hello")
    }
  }

describe('NoAccessComponent', () => {
  let component: NoAccessComponent;
  let fixture: ComponentFixture<NoAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[{provide:StudentService,useClass:MockStudentService}],
      declarations: [ NoAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
