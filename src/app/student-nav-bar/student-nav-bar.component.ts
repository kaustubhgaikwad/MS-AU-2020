import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'student-nav-bar',
  templateUrl: './student-nav-bar.component.html',
  styleUrls: ['./student-nav-bar.component.css']
})
export class StudentNavBarComponent implements OnInit {

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
