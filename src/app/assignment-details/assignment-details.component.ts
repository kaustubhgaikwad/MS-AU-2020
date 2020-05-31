import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../shared/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {
  currentAssignment = null;
  message = '';
  constructor(private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.message = '';
      this.getAssignment(this.route.snapshot.paramMap.get('id'));
    }
  
    getAssignment(id) {
      this.assignmentService.get(id)
        .subscribe(
          data => {
            this.currentAssignment = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  
    // updatePublished(status) {
    //   const data = {
    //     title: this.currentTutorial.title,
    //     description: this.currentTutorial.description,
    //     published: status
    //   };
  
    //   this.tutorialService.update(this.currentTutorial.id, data)
    //     .subscribe(
    //       response => {
    //         this.currentTutorial.published = status;
    //         console.log(response);
    //       },
    //       error => {
    //         console.log(error);
    //       });
    // }
  
    updateAssignment() {
      this.assignmentService.update(this.currentAssignment.id, this.currentAssignment)
        .subscribe(
          response => {
            console.log(response);
            this.message = 'The tutorial was updated successfully!';
            alert("Assignment updated ");
            this.router.navigate(['/admin/assignments']);
          },
          error => {
            console.log(error);
          });
    }
  
    deleteAssignment() {
      this.assignmentService.delete(this.currentAssignment.id)
        .subscribe(
          response => {
            console.log("no error");
            console.log(response);
            this.router.navigate(['admin/assignments']);
          },
          error => {
            console.log("error")
            console.log(error);
          });
    }

}
