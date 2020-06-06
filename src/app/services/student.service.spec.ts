import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

const mockData={
  studentId:1,
  studentName:"abcd",
  score:5
}

fdescribe('StudentService', () => {
  let service: StudentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(StudentService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    
  });

  it('testing student service get student email', () => {
   
    service.getStudent("email").subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.studentName).toEqual("abcd");
      }
    )

    const req = httpTestingController.expectOne('http://localhost:8080/student/email/email');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('testing student service get all student', () => {
    
    service.getAll().subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.studentName).toEqual("abcd");
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/student/all');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);

  });

  it('testing student service get  student by id', () => {

    service.getStudentById(1).subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.studentName).toEqual("abcd");
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/student/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('testing student service get  student score by id', () => {

    service.getStudentScore(1).subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.score).toEqual(5);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/student/score/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('testing student service update student finalscore ', () => {

    service.updateStudentFinalScore(1).subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.score).toEqual(5);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/student/finalscore');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockData);
  });

  it('testing student service calculate student finalscore ', () => {
   
    service.calculateFinalScore().subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.score).toEqual(5);
      }
    )
    const req = httpTestingController.expectOne('http://localhost:8080/student/calculatefinalScore');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });


});
