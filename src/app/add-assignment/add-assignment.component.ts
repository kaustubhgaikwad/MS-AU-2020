import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../shared/assignment.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  assignment = {
    title: '',
    description: ''
  };
  submitted = false;


  constructor(private assignmentService:AssignmentService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  saveAssignment() {
    const data = {
      title: this.assignment.title,
      description: this.assignment.description
    };

    this.assignmentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success("Assignment Added");
          this.router.navigate(['/admin/assignments']);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newAssignment() {
    this.submitted = false;
    this.assignment = {
      title: '',
      description: ''
    };
  }

}
