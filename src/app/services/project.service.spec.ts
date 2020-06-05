import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

fdescribe('ProjectService', () => {
  let service: ProjectService;
  let httpTestingController: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ProjectService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
    
  });


  
  it('Get All Project Data', () => {
    const mockData={
      projectId:1,
      studentId:1,
      studentName:"name",
      projectTitle:"Title"
    };

    service.getByStudentId(1).subscribe(
      data=>{
        let projectData:any;
        projectData=data;
          expect(projectData.studentName).toEqual("name")
          expect(projectData.studentId).toEqual(1)
     }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/project/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);    
  });

  it('Testing add project data', () => {
    const mockData={
      projectId:1,
      studentId:1,
      studentName:"name",
      projectTitle:"Title"
    };

    service.add(mockData).subscribe(
      data=>{
          let projectData:any;
          projectData=data;
          expect(projectData.studentName).toEqual("name")
          expect(projectData.studentId).toEqual(1)
     }
    )
    //const req=httpTestingController.match('http://localhost:8080/project/add');
    const req = httpTestingController.expectOne('http://localhost:8080/project/add');
  
    expect(req.request.method).toEqual('POST');
    req.flush(mockData);    
  });

  it('Testing update project data', () => {
    const mockData={
      projectId:1,
      studentId:1,
      studentName:"name",
      projectTitle:"Title"
    };

    service.update(mockData).subscribe(
      data=>{
          let projectData:any;
          projectData=data;
          expect(projectData.studentName).toEqual("name")
          expect(projectData.studentId).toEqual(1)
     }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/project/update');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockData);    
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
