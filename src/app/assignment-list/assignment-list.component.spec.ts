import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentListComponent } from './assignment-list.component';
import { AuthService } from '../services/auth.service';
import { AssignmentService } from '../shared/assignment.service';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

let toaster={
  success: jasmine.createSpy('success')
}
let router={
  navigate: jasmine.createSpy('navigate')
}

class MockAuthService{
  isAdmin(){
    return true;
  }
}
class MockAssignmentService{
  getAll(){
    return of (
      {
          name:"abc",
          title:"title",
          id:2
      }
    )
  }
}
class MockStudentAssignmetService{
  getAll(){
    return of (
      {
        name:"abc",
        title:"title",
        id:2
      }
    )
  }
}

fdescribe('AssignmentListComponent', () => {
  let component: AssignmentListComponent;
  let fixture: ComponentFixture<AssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:AuthService,useClass:MockAuthService},
        {provide:AssignmentService,useClass:MockAssignmentService},
        {provide:StudentAssignmentService,useClass:MockStudentAssignmetService},
        {provide:Router,useValue:router},
        {provide:ToastrService,useValue:toaster},
        {provide:HttpClient,useClass:HttpClientTestingModule}
      ],
      imports:[FormsModule,HttpClientTestingModule],
      declarations: [ AssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test if all assignment list is loaded', () => {
    component.ngOnInit();
    //component.evaluteAssignment();
    expect(component.submittedAssignments).toBeDefined();
  });

  it('Test if change status function works', () => {
    component.ngOnInit();
    let statusBefore=component.showSubmission;
    component.changeShowStatus()
    let statusAfter=component.showSubmission;
    expect(statusBefore).toBe(!statusAfter);
  });
});
