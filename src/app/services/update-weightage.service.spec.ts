import { TestBed } from '@angular/core/testing';

import { UpdateWeightageService } from './update-weightage.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockData={
          assingment:3,
          project:4
}

fdescribe('UpdateWeightageService', () => {
  let service: UpdateWeightageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(UpdateWeightageService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('Testing update-weightage get ', () => {
 
    service.getWeightage().subscribe(
      data=>{
        let weightage:any;
        weightage=data;
        expect(weightage.project).toEqual(4);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/weightage/get');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('Testing update-weightage update ', () => {
    
    const mockData={
        assingment:3,
          project:4
    }
    service.update(mockData).subscribe(
      data=>{
        let weightage:any;
        weightage=data;
        expect(weightage.project).toEqual(4);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/weightage/update');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockData);
    
  });

});
