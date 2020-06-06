import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavBarComponent } from './student-nav-bar.component';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { of } from 'rxjs/internal/observable/of';

class MockAuthService{
  logout(){
    console.log("Auth Service logout")
  }
}
class MockStudentService{
  getStudent(){
    return of (
      {
        id:1,
        name:"abc"
      }
    )
  }
}

fdescribe('StudentNavBarComponent', () => {
  let component: StudentNavBarComponent;
  let fixture: ComponentFixture<StudentNavBarComponent>;
  let studentService:MockStudentService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[StudentNavBarComponent,{provide:AuthService,useClass:MockAuthService},{provide:StudentService,useClass:MockStudentService}],
      declarations: [ StudentNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing student value before calling studentService', () => {
    
    expect(component.student).toBeDefined();

  });
});
