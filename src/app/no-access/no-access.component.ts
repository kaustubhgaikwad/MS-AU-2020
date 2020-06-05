import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css']
})
export class NoAccessComponent implements OnInit {

  constructor(private studentService:StudentService) { }
  hello ="";
  ngOnInit(): void {
    this.hello="hello";
  }
  getEmail(){
    this.studentService.getStudent("email").subscribe();
  }

}
