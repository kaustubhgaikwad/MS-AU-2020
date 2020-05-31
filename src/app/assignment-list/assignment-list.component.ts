import { Component, OnInit } from '@angular/core';
import {  ColDef,GridApi,ColumnApi  } from 'ag-grid-community'; 
import { Router } from '@angular/router';
import { AssignmentService } from '../shared/assignment.service';
@Component({
  selector: 'assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {

  assignments: any;
  currentAssignment = null;
  currentIndex = -1;
  title = '';
  public columnDefs: ColDef[];  
    // gridApi and columnApi  
  private api: GridApi;  
  private columnApi: ColumnApi;


  constructor(
    private assignmentService: AssignmentService,
    private router:Router
              ) { 
                this.columnDefs = this.createColumnDefs();
              }

              ngOnInit() {
                this.retrieveAssignments();
              }
            
              onGridReady(params): void {  
                this.api = params.api;  
                this.columnApi = params.columnApi;  
                this.api.sizeColumnsToFit();  
            }
            
            editAssignment(){
              if (this.api.getSelectedRows().length == 0) {  
                alert("Please select a row for update");
                //this.toastr.error("error", "Please select a User for update");  
                return;  
            }  
            var row = this.api.getSelectedRows();  
            console.log("Row selected:"+"Title="+ row[0].title+"Description="+row[0].description,"Id="+row[0].id);
            this.router.navigate(['admin/assignments/'+row[0].id]);
            // this.userService.updateUser(row[0]).subscribe(data => {  
            //     this.toastr.success("success", data);  
            //     this.ngOnInit();  
            // }); 
            }
            
            private createColumnDefs() {  
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

}
