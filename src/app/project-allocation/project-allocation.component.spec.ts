import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAllocationComponent } from './project-allocation.component';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { ProjectEvaluationService } from '../services/project-evaluation.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import { of } from 'rxjs';

let toaster={
  success: jasmine.createSpy('success')
}
let router={
  navigate: jasmine.createSpy('navigate')
}
class MockAuthService{


}
class MockStudentService{
  getAll(){
    return of(
      {
        Id:1,
        name:"name"
      }
    )
  }
}
class MockProjectService{

}
class MockProjectEvaluation{
  get(){
    return of(
        {
          projectTitle:"abc",
          projectId:1
        }
    )
  }
}

fdescribe('ProjectAllocationComponent', () => {
  let component: ProjectAllocationComponent;
  let fixture: ComponentFixture<ProjectAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:AuthService,useClass:MockAuthService},
        {provide:ProjectService,useClass:MockProjectService},
        {provide:StudentService,useClass:MockStudentService},
        {provide:ProjectEvaluationService,useClass:MockProjectEvaluation},
        {provide:Router,useValue:router},
        {provide:ToastrService,useClass:toaster}
        
      ],
      declarations: [ ProjectAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAllocationComponent);
    component = fixture.componentInstance;
    //component.ngOnInit();
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('test if project allocation data is loaded', () => {
    
  //   expect(component.evaluate());
  //   //component.ngOnInit();
  //   //expect(component.studentData);
  //   //expect(component.projectParameters).toBeDefined();

  // });
});
