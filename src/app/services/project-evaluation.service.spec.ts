import { TestBed } from '@angular/core/testing';

import { ProjectEvaluationService } from './project-evaluation.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

const mockData={
          build:4,
          test:5,
          process:6
}

fdescribe('ProjectEvaluationService', () => {
  let service: ProjectEvaluationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ProjectEvaluationService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    
  });


  it('test project evalution get method', () => {
    // spyOn(service,'get').and.callFake(()=>{
    //   return of (
    //     {
    //       build:4,
    //       test:5,
    //       process:6
    //     }
    //   )
    // })
    service.get().subscribe(
      data=>{
        let projectData:any;
        projectData=data;
        expect(projectData.build).toEqual(4);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/projectevaluation/get');
  
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  // it('test project evalution update method', () => {

  // const mockData={
  //         build:4,
  //         test:5,
  //         process:6
  // };

  // service.update(mockData).subscribe(
  //    data=>{
  //      let projectData:any;
  //      projectData=data;
  //      expect(projectData.build).toEqual(4);
  //    }
  // )
  
  // //const req=httpTestingController.match('http://localhost:8080/project/add');
  // const req = httpTestingController.expectOne('http://localhost:8080/projectevaluation/update');

  // expect(req.request.method).toEqual('PUT');
  // req.flush(mockData); 
  // });


});
