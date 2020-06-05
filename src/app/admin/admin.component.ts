import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin:any;
  isAssignmentRecordLoaded=false;
  assignmentRecords=[]
  assignment:any;
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Assignment Title';
  showYAxisLabel = true;
  yAxisLabel = 'Completed No';
  public studentColDefs: ColDef[]; 
  studentRecords:any;
  private api: GridApi;  
  private columnApi: ColumnApi;

  constructor(public authService:AuthService,private studentAssignmentService:StudentAssignmentService,private studentService:StudentService) { 
    this.studentColDefs = this.createStudentColDefs();
  }

  createStudentColDefs(){
    return [{  
      headerName: 'Candidate Name',  
      field: 'name',  
      filter: true,  
      enableSorting: true,  
      editable: true,  
      sortable: true  
  },
  {  
    headerName: 'Email Id',  
    field: 'emailId',  
    filter: true,  
    enableSorting: true,  
    editable: true,  
    sortable: true  
} 
]
  }
  onGridReady(params): void {  
    this.api = params.api;  
    this.columnApi = params.columnApi;  
    this.api.sizeColumnsToFit();  
}

  ngOnInit(): void {
    this.admin=this.authService.isAdmin();
    this.getAssignmentRecord();
    this.getStudentsRecord();
  }
  getStudentsRecord(){

    this.studentService.getAll().subscribe(
      data=>{
        this.studentRecords=data;
      },error=>{

      }
    )

  }


  getAssignmentRecord(){
    this.studentAssignmentService.getAssignmentDone().subscribe(
      data=>{
          if(data !=null){
            this.isAssignmentRecordLoaded=true;
            this.assignment=data;
            for(let index in this.assignment){
              this.assignmentRecords.push(
                {
                  name:this.assignment[index][0],
                  value:this.assignment[index][1]
                }
              )
              console.log("Title="+this.assignment[index][0]);
              console.log("Count="+this.assignment[index][1]);
            }

          }
      },error=>{

      }
    )

  }

}
