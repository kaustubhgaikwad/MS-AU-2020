import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { AuthService } from '../services/auth.service';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { StudentService } from '../services/student.service';
import { of } from 'rxjs/internal/observable/of';
import { AgGridModule } from 'ag-grid-angular';
import { AssignmentService } from '../shared/assignment.service';

class MockAuthService{
  isAdmin(){
    return true;
  }
}
class MockStudentAssignmentService{
  getAssignmentDone(){
    return of (
      {
        id:1,
        name:"name"
      }
    )
  }
}
class MockStudentService{
  getAll(){
    return of(
      {
        id:1,
        name:"name"
      }
    )
  }
}

fdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let service : StudentAssignmentService; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:AuthService,useClass:MockAuthService},
        {provide:StudentAssignmentService,useClass:MockStudentAssignmentService},
        {provide:StudentService,useClass:MockStudentService},
        AdminComponent
      ],
      imports:[],
      declarations: [ AdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(StudentAssignmentService);
  });

  it('Testing if all records are loaded', () => {
    component.ngOnInit();
    //component.onGridReady();
    expect(component.isAssignmentRecordLoaded).toBeTrue();
  });

 


  
  

});
