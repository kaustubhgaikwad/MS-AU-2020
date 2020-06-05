import { Component, OnInit } from '@angular/core';
import {  ColDef,GridApi,ColumnApi  } from 'ag-grid-community'; 
import { Router } from '@angular/router';
import { AssignmentService } from '../shared/assignment.service';
import { AuthService } from '../services/auth.service';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {

  isAdmin:boolean;
  
  assignments: any;
  submittedAssignments:any;
  currentAssignment = null;
  currentIndex = -1;
  showSubmission=false;
  title = '';
  public assignmentColumnDefs: ColDef[]; 
  public submissionColumnDefs:ColDef[]; 
    // gridApi and columnApi  
  private api: GridApi;  
  private columnApi: ColumnApi;


  constructor(
    public authService:AuthService,
    private assignmentService: AssignmentService,
    private router:Router,
    private studentAssignmentService:StudentAssignmentService,
    private toastr:ToastrService
              ) { 
                this.assignmentColumnDefs = this.createAssignmentColumnDefs();
                this.submissionColumnDefs = this.createSubmissionColumnDefs();
              }

              

              ngOnInit() {
                this.isAdmin=this.authService.isAdmin()
                this.retrieveAssignments();
                this.retrieveAssignmentsRecords();
              }
              retrieveAssignmentsRecords(){
                this.studentAssignmentService.getAll().subscribe(
                  data=>{
                      this.submittedAssignments=data;
                  },error=>{
                      console.log(error);
                  }
                )
              }
            
              onGridReady(params): void {  
                this.api = params.api;  
                this.columnApi = params.columnApi;  
                this.api.sizeColumnsToFit();  
            }

            evaluteAssignment(){
                if (this.api.getSelectedRows().length == 0) { 
                  if(this.isAdmin) 
                  this.toastr.error("error", "Please select a User for update");
                  //alert("Please select an assignment for evaluation for update");
                  else if(!this.isAdmin){
                    alert("Please select a assignment for submission");
                  }
                  //this.toastr.error("error", "Please select a User for update");  
                  return;  
              }  
              var row = this.api.getSelectedRows();  
              if(this.isAdmin){
                //console.log("Marks entered="+row[0].score);
                this.router.navigate(['admin/update-assignments/'+row[0].id]);
              }
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
              console.log("Row selected:"+"Title="+ row[0].title+"Description="+row[0].description,"Id="+row[0].id);
              this.router.navigate(['student/assignments/'+row[0].id]);
            }
            
            // this.userService.updateUser(row[0]).subscribe(data => {  
            //     this.toastr.success("success", data);  
            //     this.ngOnInit();  
            // }); 
            }
            
            private createAssignmentColumnDefs() {  
              return [{  
                  headerName: 'Assignment Title',  
                  field: 'title',  
                  filter: true,  
                  enableSorting: true,  
                  editable: true,  
                  sortable: true  
              }, {  
                  headerName: 'Description',  
                  field: 'description',  
                  filter: true,  
                  editable: true,  
                  sortable: true  
              }]  
            }

            createSubmissionColumnDefs(){
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
              headerName: 'Candidate Name',  
              field: 'studentName',  
              filter: true,  
              editable: true,  
              sortable: true  
          },
            {  
              headerName: 'Email',  
              field: 'studentEmail',  
              filter: true,  
              editable: true,  
              sortable: true  
          }, {  
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
      }
      ]
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

              changeShowStatus(){
                this.showSubmission = !this.showSubmission;
              }

}
