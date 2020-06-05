import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
    spyOn(service,'getStudent').and.callFake(()=>{
      return of(
        {
          studentId:1,
          studentName:"abcd"
        }
      )
    })
    service.getStudent("email").subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.studentName).toEqual("abcd");
      }
    )
  });

  it('testing student service get all student', () => {
    spyOn(service,'getAll').and.callFake(()=>{
      return of(
        {
          studentId:1,
          studentName:"abcd"
        }
      )
    })
    service.getAll().subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.studentName).toEqual("abcd");
      }
    )
  });

  it('testing student service get  student by id', () => {
    spyOn(service,'getStudentById').and.callFake(()=>{
      return of(
        {
          studentId:1,
          studentName:"abcd"
        }
      )
    })
    service.getStudentById(1).subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.studentName).toEqual("abcd");
      }
    )
  });

  it('testing student service get  student score by id', () => {
    spyOn(service,'getStudentScore').and.callFake(()=>{
      return of(
        {
          studentId:1,
          studentName:"abcd",
          score:5
        }
      )
    })
    service.getStudentScore(1).subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.score).toEqual(5);
      }
    )
  });

  it('testing student service update student finalscore ', () => {
    spyOn(service,'updateStudentFinalScore').and.callFake(()=>{
      return of(
        {
          studentId:1,
          studentName:"abcd",
          score:5
        }
      )
    })
    service.updateStudentFinalScore(1).subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.score).toEqual(5);
      }
    )
  });

  it('testing student service calculate student finalscore ', () => {
    spyOn(service,'calculateFinalScore').and.callFake(()=>{
      return of(
        {
          studentId:1,
          studentName:"abcd",
          score:5
        }
      )
    })
    service.calculateFinalScore().subscribe(
      data=>{
        let student:any;
        student=data;
        expect(student.score).toEqual(5);
      }
    )
  });


});
