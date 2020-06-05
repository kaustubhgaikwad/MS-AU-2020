import { TestBed } from '@angular/core/testing';

import { UpdateWeightageService } from './update-weightage.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('UpdateWeightageService', () => {
  let service: UpdateWeightageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(UpdateWeightageService);
  });

  it('Testing update-weightage get ', () => {
    spyOn(service,'getWeightage').and.callFake(()=>{
      return of(
        {
          assingment:3,
          project:4
        }
      )
    })
    service.getWeightage().subscribe(
      data=>{
        let weightage:any;
        weightage=data;
        expect(weightage.project).toEqual(4);
      }
    )
  });

  it('Testing update-weightage update ', () => {
    spyOn(service,'update').and.callFake(()=>{
      return of(
        {
          assingment:3,
          project:4
        }
      )
    })
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
  });

});
