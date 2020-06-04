import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public authService:AuthService,public studentService:StudentService) { }

  student:any;

  ngOnInit(): void {
    this.studentService.getStudent(localStorage.getItem('email')).subscribe(
      data=>{
        this.student = data;
        localStorage.setItem('studentId',this.student.id);
      },error=>{
        
      }
      
    )
  }

}
