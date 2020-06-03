import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css']
})
export class ProjectAllocationComponent implements OnInit {

  public columnDefs: ColDef[];  
  // gridApi and columnApi  
  private api: GridApi;  
  private columnApi: ColumnApi;
  studentData:any;
  displayStudentList = true;
  projectData=new Project();
  currentStudent:any;
  currentProject:any;
  isProjectAllocated:boolean


  constructor(  
    public authService:AuthService,
    private studentService: StudentService,
    private router:Router,
    private toastr:ToastrService,
    private projectSerivce:ProjectService
    ) { 
      this.columnDefs = this.createColumnDefs();
    }

  ngOnInit(): void {
    this.displayStudentList=true;
    this.getAllRecords();
  }

  onGridReady(params): void {  
    this.api = params.api;  
    this.columnApi = params.columnApi;  
    this.api.sizeColumnsToFit();  
}
saveProject(data){
  console.log("desc="+data.description0);
  this.projectData= new Project();
  this.projectData.studentId=this.currentStudent.id;
  this.projectData.studentName=data.name;
  this.projectData.projectTitle=data.title;
  this.projectData.projectDescription=data.description;
  this.projectData.projectId=1;
  this.projectData.githubLink="";
  this.projectData.testingCoverage=0;
  this.projectData.build=0;
  this.projectData.completionPercentage=0;
  this.projectData.score=0;
  this.projectData.currentlyWorkingOn="";

  this.projectSerivce.add(this.projectData).subscribe(
    data=>{
      console.log("project allocated="+data);
      this.displayStudentList=true;

    },error=>{
      console.log(error);
    }
  )

}
updateProject(){
  console.log("inside update");
  this.displayStudentList=true;
  this.projectSerivce.update(this.currentProject).subscribe(
    data=>{
      console.log("update project sucessfull");
    },error=>{

    }
  )
}

// saveProject(){
//     this.projectData.studentId=this.currentStudent.id;
//     this.projectData.studentName=this.currentStudent.name;
//     this.projectData.githubLink="";
//     this.projectData.testingCoverage=0;
//     this.projectSerivce.add(this.projectData).subscribe(
//       data=>{
//         console.log("Project added");
//         this.displayStudentList=true;
//       },error=>{
//         console.log(error);
        
//       }
//     )
// }

  private createColumnDefs() {  
    return [{  
        headerName: 'Student Name',  
        field: 'name',  
        filter: true,  
        enableSorting: true,  
        editable: true,  
        sortable: true  
    },{  
      headerName: 'Student Email',  
      field: 'emailId',  
      filter: true,  
      enableSorting: true,  
      editable: true,  
      sortable: true  
  } ]  
  }
  getAllRecords(){
    this.studentService.getAll().subscribe(
      data=>{
          this.studentData=data;
      },error=>{

      }
    )
  }

  showStudentDetails(){
    if (this.api.getSelectedRows().length == 0) { 
      this.toastr.error("error", "Please select a student");  
      return;  
  }  
    var row = this.api.getSelectedRows();
    console.log("Student id="+row[0].id);
    this.currentStudent = row[0];
    this.displayStudentList=false;
    this.projectSerivce.getByStudentId(row[0].id).subscribe(
      data=>{
        if(data!=null){
          this.currentProject = data;
          this.isProjectAllocated=true;  
          
        }else{
          this.isProjectAllocated=false;
        }
      },error=>{
        console.log(error);
      }
    )
  }

  

}
