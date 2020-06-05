import { TestBed } from '@angular/core/testing';

import { StudentAssignmentService } from './student-assignment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

fdescribe('StudentAssignmentService', () => {
  let service: StudentAssignmentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(StudentAssignmentService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    
  });

  it('Testing student assignment service get all method', () => {
    spyOn(service,'getAll').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    service.getAll().subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });

  it('Testing student assignment service get by id method', () => {
    spyOn(service,'getRecordById').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    service.getRecordById(1).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });


  it('Testing student assignment service get all assignments done', () => {
    spyOn(service,'getAssignmentDone').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    service.getAssignmentDone().subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });

  it('Testing student assignment service get assignment by email', () => {
    spyOn(service,'getRecordByEmail').and.callFake(()=>{
      return of (
        {
          studentEmail:"abc",
          assignmentId:1
        }
      )
    })

    service.getRecordByEmail("abc").subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentEmail).toEqual("abc");
      }
    )
  });

  it('Testing student assignment service get assignment by student id', () => {
    spyOn(service,'getRecordByStudentId').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    service.getRecordByStudentId(1).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });

  it('Testing student assignment service get assignment by email and title', () => {
    spyOn(service,'getRecord').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    service.getRecord("title","email").subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });

  it('Testing student assignment service calcualte assignment score', () => {
    spyOn(service,'calculateAssignmentScore').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    service.calculateAssignmentScore(1).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });

  it('Testing student assignment service add method', () => {
    spyOn(service,'addRecord').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    const mockData={
          studentId:1,
          assignmentId:1
    }

    service.addRecord(mockData).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });


  it('Testing student assignment service update method', () => {
    spyOn(service,'updateRecord').and.callFake(()=>{
      return of (
        {
          studentId:1,
          assignmentId:1
        }
      )
    })

    const mockData={
          studentId:1,
          assignmentId:1
    }

    service.updateRecord(1,mockData).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
  });


});
