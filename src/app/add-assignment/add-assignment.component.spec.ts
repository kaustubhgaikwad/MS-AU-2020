import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentComponent } from './add-assignment.component';
import { of } from 'rxjs';
import { AssignmentService } from '../shared/assignment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

class MockAssignmentService{
  create(data){
    return of(
      {
        data
      }
    )
  }
}

let toaster={
  success: jasmine.createSpy('success')
}
let router={
  navigate: jasmine.createSpy('navigate')
}

fdescribe('AddAssignmentComponent', () => {
  let component: AddAssignmentComponent;
  let fixture: ComponentFixture<AddAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
      {provide:AssignmentService,useClass:MockAssignmentService},
      {provide:Router,useValue:router},{provide:ToastrService,useValue:toaster},
      {provide:HttpClient,useClass:HttpClientTestingModule}],
      imports:[FormsModule,HttpClientTestingModule],
      declarations: [ AddAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Testing if assignment is proerly loaded', () => {
    component.ngOnInit();
    component.saveAssignment();
    expect(component.submitted).toBeTrue();
  });
});
