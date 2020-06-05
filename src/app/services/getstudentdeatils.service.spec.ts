import { TestBed } from '@angular/core/testing';

import { GetstudentdeatilsService } from './getstudentdeatils.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

fdescribe('GetstudentdeatilsService', () => {
  let service: GetstudentdeatilsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(GetstudentdeatilsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    spyOn(service,'getdetails').and.callFake(()=>{
      return of (
        {
          name:"abcd",
          score:4
        }
      )
    })
    service.getdetails().subscribe(
      data=>{
        let responseData:any
        responseData=data;
        expect(responseData.name).toEqual("abcd");
      }
    )
  });
});
