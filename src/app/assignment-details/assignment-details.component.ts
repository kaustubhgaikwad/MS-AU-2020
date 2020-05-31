import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../shared/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { StudentAssignmentService } from '../services/student-assignment.service';

@Component({
  selector: 'assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {
  currentAssignment = null;
  message = '';
  UserData:any;

  constructor(private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    public authService:AuthService,
    private studentService:StudentService,
    private studentAssignmentService:StudentAssignmentService) { }

    ngOnInit() {
      this.message = '';
      this.getAssignment(this.route.snapshot.paramMap.get('id'));
    }
    submitAssignment(assignmentRecord){
      this.studentService.getStudent(localStorage.getItem('email')).subscribe(
        data=>{
           this.UserData = data;
            const record={
                  assignmentTitle: this.currentAssignment.title,
                  assignmentDescription:this.currentAssignment.description,
                  assignmentSolution:assignmentRecord.solution,
                  studentName:this.UserData,
                  studentEmail: localStorage.getItem('email'),
              }
              this.studentAssignmentService.addRecord(data).subscribe(
                data=>{   
                    alert("Assignment Submiited successfully");
                    this.router.navigate(['/student/assignments']);
                },error=>{
                  alert(error);
                  
                }
              )
        },error=>{
          alert(error);
        }
      )
    //   const data={
    //     assignmentTitle: this.currentAssignment.title,
    //     assignmentDescription:this.currentAssignment.description,
    //     assignmentSolution:assignmentRecord.solution,
    //     "studentName": "Pedro",
    //     studentEmail: localStorage.getItem('email'),
    //     "id": 29
    // }
      //console.log("assignment record= "+assignmentRecord.solution)
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
