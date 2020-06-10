import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAllocationComponent } from './project-allocation.component';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { ProjectEvaluationService } from '../services/project-evaluation.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
  let studentService:StudentService;

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
      imports:[HttpClientTestingModule],
      declarations: [ ProjectAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAllocationComponent);
    component = fixture.componentInstance;
    studentService = TestBed.get(StudentService);
    //component.ngOnInit();
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('test if project allocation data is loaded', (done) => {
    
    //expect(component.evaluate());

    //component.ngOnInit();
    component.getAllRecords();
    expect(component.studentData).toBeDefined();
    // studentService.getAll().subscribe(()=>{
    //   expect(component.studentData).toBeDefined();
    //   done();
    // }
    // )
    //expect(component.getAllRecords());
    //expect(component.projectParameters).toBeDefined();

  });

});
