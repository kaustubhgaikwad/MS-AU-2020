import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-student-project',
  templateUrl: './student-project.component.html',
  styleUrls: ['./student-project.component.css']
})
export class StudentProjectComponent implements OnInit {

  public columnDefs: ColDef[];  
  // gridApi and columnApi  
  private api: GridApi;  
  private columnApi: ColumnApi;
  currentProject:any;
  currentStudent:any;
  projectAllocated:boolean;
  progressStats=34;
  
  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.getProjectDetails();
    
  }
  onGridReady(params): void {  
    this.api = params.api;  
    this.columnApi = params.columnApi;  
    this.api.sizeColumnsToFit();  
}

getProjectDetails(){
  console.log("ID="+localStorage.getItem('studentId'));
    this.projectService.getByStudentId(localStorage.getItem('studentId')).subscribe(
      data=>{
        if(data!=null){
          console.log("Inside get Project Details");
          
          this.currentProject=data;
          console.log(this.currentProject);
          this.projectAllocated=true;
        }else{
          alert("data return null");
          this.projectAllocated=false;
        }
      },error=>{
        alert("error in fetching project details");
        console.log(error);
      }
    )
}
updateProject(){
  this.projectService.update(this.currentProject).subscribe(
    data=>{
      console.log("Project Details Updated");
      console.log("Data="+data);

    },error=>{

    }
  )
}

}
