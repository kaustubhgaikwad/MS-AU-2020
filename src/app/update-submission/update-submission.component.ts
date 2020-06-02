import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../shared/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-submission',
  templateUrl: './update-submission.component.html',
  styleUrls: ['./update-submission.component.css']
})
export class UpdateSubmissionComponent implements OnInit  {
  currentAssignment = null;
  currentSolution= "  ";
  message = '';
  UserData:any;
  solution:any;
  isSubmitted=false;
  SubmittedAssignment=null;

  constructor(private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    public authService:AuthService,
    private studentService:StudentService,
    private studentAssignmentService:StudentAssignmentService,
    private toastr: ToastrService) { }

    ngOnInit() {
      this.message = '';
      console.log("Submitting again");
      //this.getAssignment(this.route.snapshot.paramMap.get('id'));
      this.getAssignnmentRecord(this.route.snapshot.paramMap.get('id'));
    }

    getAssignnmentRecord(id,){
      this.studentAssignmentService.getRecordById(id).subscribe(
        data=>{
            if(data){
              this.SubmittedAssignment=data;
              this.isSubmitted=true;
              this.currentSolution=this.SubmittedAssignment.solution
              console.log("sol="+this.SubmittedAssignment.solution)
              if(this.SubmittedAssignment.score>0){
                this.message="Your submission has been evaluted ,you cannot edit it"
              }else{
              this.message="You have already submitted this assignment, you can still update it"
              }
            }else{
              console.log("else");
              this.isSubmitted=false;
            }
        },error=>{
          alert(error);
        }
        
      )
    }
    updateSubmission(){
      this.studentAssignmentService.updateRecord(this.SubmittedAssignment.id,this.SubmittedAssignment).subscribe(
      data=>{
            this.message = 'Your assignment submission was updated successfully!';
            this.toastr.success("Updated","Assignment");
            //.clear("Updated","Assignment Submission");
            //alert("Assignment submission updated ");
            this.router.navigate(['/student/assignments']);
      },error=>{
        alert(error);
      }
    )
    }

    evaluteAssignment(){
      console.log("Marks entered ="+this.SubmittedAssignment.score);
      this.studentAssignmentService.updateRecord(this.SubmittedAssignment.id,this.SubmittedAssignment).subscribe(
      data=>{
            this.message = 'Assignment Evalution Done!';
            this.toastr.success(" Done!","Assignment Evalution");
            //.clear("Updated","Assignment Submission");
            //alert("Assignment submission updated ");
            this.router.navigate(["/admin/assignments"]);
      },error=>{
        alert(error);
      }
    )
    }

    

    submitAssignment(assignmentRecord){
    //   const record={
    //     assignmentTitle: assignmentRecord.title,
    //     assignmentDescription:assignmentRecord.description,
    //     assignmentSolution:assignmentRecord.solution,
    //     studentName:"",
    //     studentEmail: localStorage.getItem('email'),
        
    // };
    const record={
      assignmentTitle: assignmentRecord.title,
      assignmentDescription:assignmentRecord.description,
      assignmentSolution:assignmentRecord.solution,
      studentName:"",
      studentEmail: localStorage.getItem('email'),
      assignmentId:this.currentAssignment.id,
      studentId:0,
      score:0
  };
    this.studentAssignmentService.addRecord(record).subscribe(
      data=>{
          console.log("After adding ="+data);
          this.toastr.success("Done", "Assignment Submission");
          //alert("Submiison successfull");
          this.router.navigate(['/student/assignments']);
      },error=>{

      }
      
    )
      // this.studentService.getStudent(localStorage.getItem('email')).subscribe(
      //   data=>{
      //      this.UserData = data;
      //      console.log("assignmentRecord title= "+assignmentRecord.title);
      //      console.log("assignmentRecord decscription= "+assignmentRecord.description);
      //      console.log("assignmentRecord solution = "+assignmentRecord.solution);
      //      console.log("assignmentRecord name= "+this.UserData.name);
      //      console.log("assignmentRecord email= "+localStorage.getItem('email'));
      //       const record={
      //             assignmentTitle: this.currentAssignment.title,
      //             assignmentDescription:this.currentAssignment.description,
      //             assignmentSolution:assignmentRecord.solution,
      //             studentName:this.UserData.name,
      //             studentEmail: localStorage.getItem('email')
      //         };
      //         console.log(record)
      //         this.studentAssignmentService.addRecord(data).subscribe(
      //           data=>{   
      //             console.log("Record added= "+data)
      //               alert("Assignment Submiited successfully");
      //               this.router.navigate(['/student/assignments']);
      //           },error=>{
      //             alert(error);
                  
      //           }
      //         )
      //   },error=>{
      //     alert(error);
      //   }
      // )
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
            //this.getAssignnmentRecord(this.currentAssignment.title,localStorage.getItem('email'));
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


