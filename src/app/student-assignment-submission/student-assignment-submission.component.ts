import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { AuthService } from '../services/auth.service';
import { AssignmentService } from '../shared/assignment.service';
import { Router } from '@angular/router';
import { StudentAssignmentService } from '../services/student-assignment.service';

@Component({
  selector: 'app-student-assignment-submission',
  templateUrl: './student-assignment-submission.component.html',
  styleUrls: ['./student-assignment-submission.component.css']
})
export class StudentAssignmentSubmissionComponent implements OnInit  {

  isAdmin:boolean;
  
  assignments: any;
  currentAssignment = null;
  currentIndex = -1;
  title = '';
  public columnDefs: ColDef[];  
    // gridApi and columnApi  
  private api: GridApi;  
  private columnApi: ColumnApi;


  constructor(
    public authService:AuthService,
    private assignmentService: AssignmentService,
    private router:Router,
    private studentAssignmentService:StudentAssignmentService
              ) { 
                this.columnDefs = this.createColumnDefs();
              }

              ngOnInit() {
                this.isAdmin=this.authService.isAdmin()
                this.getAllRecords();
                //this.retrieveAssignments();
              }
            
              onGridReady(params): void {  
                this.api = params.api;  
                this.columnApi = params.columnApi;  
                this.api.sizeColumnsToFit();  
            }
            
            editAssignment(){
              if (this.api.getSelectedRows().length == 0) { 
                if(this.isAdmin) 
                alert("Please select a assignment for update");
                else if(!this.isAdmin){
                  alert("Please select a assignment for submission");
                }
                //this.toastr.error("error", "Please select a User for update");  
                return;  
            }  
            var row = this.api.getSelectedRows();  
            if(this.isAdmin){
              console.log("Row selected:"+"Title="+ row[0].title+"Description="+row[0].description,"Id="+row[0].id);
              this.router.navigate(['admin/assignments/'+row[0].id]);
            }else if(!this.isAdmin){
              console.log("Row selected:"+"Title="+row[0].assignmentTitle+"Description="+row[0].assignmentDescription,"Id="+row[0].id);
              //this.
              this.router.navigate(['/student/update-assignments/'+row[0].id]);
              // this.assignmentService.findByTitle(row[0].assignmentTitle).subscribe(
              //     data=>{
              //         this.currentAssignment= data;
              //         console.log("currentassignment found by title"+this.currentAssignment);
              //         this.router.navigate(['/student/assignments/'+this.currentAssignment.id]);
              //     },error=>{

              //     }  
              // )
              //this.router.navigate(['student/assignments/'+row[0].id]);
            }
            
            // this.userService.updateUser(row[0]).subscribe(data => {  
            //     this.toastr.success("success", data);  
            //     this.ngOnInit();  
            // }); 
            }
            
            private createColumnDefs() {  
              return [{  
                  headerName: 'Assignment Title',  
                  field: 'assignmentTitle',  
                  filter: true,  
                  enableSorting: true,  
                  editable: true,  
                  sortable: true  
              }, {  
                  headerName: 'Description',  
                  field: 'assignmentDescription',  
                  filter: true,  
                  editable: true,  
                  sortable: true  
              },
              {  
                headerName: 'Solution',  
                field: 'assignmentSolution',  
                filter: true,  
                editable: true,  
                sortable: true  
            },
            {  
              headerName: 'Marks',  
              field: 'score',  
              filter: true,   
              sortable: true  
          }]  
            }
            
              retrieveAssignments() {
                console.log("Inside retriveAssignments()");
                this.assignmentService.getAll()
                  .subscribe(
                    data => {
                      this.assignments = data;
                      console.log("tut data="+data);
                      console.log("tut ="+this.assignments[0].title);
                    },
                    error => {
                      console.log(error);
                    });
              }
            
              refreshList() {
                this.retrieveAssignments();
                this.currentAssignment = null;
                this.currentIndex = -1;
              }
            
              setActiveTutorial(tutorial, index) {
                this.currentAssignment = tutorial;
                this.currentIndex = index;
              }
            
              // removeAllTutorials() {
              //   this.assignmentService.deleteAll()
              //     .subscribe(
              //       response => {
              //         console.log(response);
              //         this.retrieveTutorials();
              //       },
              //       error => {
              //         console.log(error);
              //       });
              // }
            
              searchTitle() {
                this.assignmentService.findByTitle(this.title)
                  .subscribe(
                    data => {
                      this.assignments = data;
                      console.log(data);
                    },
                    error => {
                      console.log(error);
                    });
              }
              getAllRecords(){
                console.log("Inside funciton for getting all record submiitted by a student");
                this.studentAssignmentService.getRecordByEmail(localStorage.getItem('email')).subscribe(
                  data=>{
                    
                      this.assignments=data;
                      console.log("records table data="+this.assignments)
                  },error=>{
                    console.log(error);
                    alert(error);
                  }
                  
                )
              }

}

