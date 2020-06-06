import { TestBed } from '@angular/core/testing';

import { StudentAssignmentService } from './student-assignment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

const mockData={
  studentId:1,
          assignmentId:1
}

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

    service.getAll().subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/all');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);

  });

  it('Testing student assignment service get by id method', () => {

    service.getRecordById(1).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });


  it('Testing student assignment service get all assignments done', () => {

    service.getAssignmentDone().subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/assignmentsDone');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('Testing student assignment service get assignment by email', () => {

    const responseData={
      studentEmail:"abc",
      studentId:1
    }

    service.getRecordByEmail("abc").subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentEmail).toEqual("abc");
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/all/abc');
    expect(req.request.method).toEqual('GET');
    req.flush(responseData);
  });

  it('Testing student assignment service get assignment by student id', () => {
    
    service.getRecordByStudentId(1).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/studentid/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
    
  });

  it('Testing student assignment service get assignment by email and title', () => {

    service.getRecord("title","email").subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/title/email');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('Testing student assignment service calcualte assignment score', () => {

    service.calculateAssignmentScore(1).subscribe(
      data=>{
        let response:any;
        response=data;
        expect(response.studentId).toEqual(1);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/score/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('Testing student assignment service add method', () => {

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
    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/add');
    expect(req.request.method).toEqual('POST');
    req.flush(mockData);
  });


  it('Testing student assignment service update method', () => {

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

    const req = httpTestingController.expectOne('http://localhost:8080/assignmentrecords/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockData);
  });


});
