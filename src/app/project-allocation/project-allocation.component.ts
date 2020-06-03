import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ProjectEvaluationService } from '../services/project-evaluation.service';
import { projectEvaluation } from '../models/projectEvaluation';

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
  viewStatus:boolean;
  completionData=[]
  testCoveredData=[]
  projectParameters:any;
  evaluateStatus:any;
  score:number
  constructor(  
    public authService:AuthService,
    private studentService: StudentService,
    private router:Router,
    private toastr:ToastrService,
    private projectSerivce:ProjectService,
    private projectEvaluation:ProjectEvaluationService
    ) { 
      this.columnDefs = this.createColumnDefs();
    }

  ngOnInit(): void {
    this.displayStudentList=true;
    this.evaluateStatus=false;
    this.getAllRecords();
    this.getProjectParameters();

  }
  evaluate(){
    this.evaluateStatus=true;
  }
  submitEvaluation(marks){
    console.log( typeof (this.currentProject.score));

    console.log((marks.process*(this.projectParameters[0].processWeightage)/10));
    //this.score=
    console.log("Process Marks="+ marks.process);
    console.log("Build Marks="+ marks.build);
    console.log("Test Marks="+ marks.test);
    console.log("Process Wieghtage"+ ((this.projectParameters[0].processWeightage)/10))
    console.log("Build Wieghtage"+ ((this.projectParameters[0].buildWeightage)/10))
    console.log("Test Wieghtage"+ ((this.projectParameters[0].testingWeightage)/10))
    this.currentProject.score = 0;
    this.currentProject.buildMarks=marks.build
    this.currentProject.testingMarks=marks.test
    this.currentProject.processMarks=marks.process
    this.currentProject.score=( (marks.process*(this.projectParameters[0].processWeightage)/10))+((marks.build*(this.projectParameters[0].buildWeightage)/10))+((marks.test*(this.projectParameters[0].testingWeightage)/10))
    
    console.log("Marks="+ this.currentProject.score);
    this.projectSerivce.update(this.currentProject).subscribe(
      data=>{
        console.log("Evalution Done");
      },error=>{

      }
    );
    this.evaluateStatus=false;
    }
  
  getProjectParameters() {
    this.projectEvaluation.get().subscribe(
      data=>{
//       this.projectParameters = new projectEvaluation();
        this.projectParameters = data
        console.log("Project Parameters")
        console.log("Build weightage="+this.projectParameters[0].buildWeightage);
        console.log("Process weightage="+this.projectParameters[0].processWeightage)
        console.log("Testing weightage="+this.projectParameters[0].testingWeightage)
      },error=>{

      }
    )
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
      console.log(this.currentProject.projectTitle);
    },error=>{

    }
  )
}
changeViewStatus(){
  this.viewStatus = !this.viewStatus;
}

pieChartLabelCompletion(completionStatus: any[], name: string): string {
  const item = completionStatus.filter(data => data.name === name);
  if (item.length > 0) {
      return item[0].label;
  }
  return name;
}
pieChartLabelTest(testCoverage: any[], name: string): string {
  const item = testCoverage.filter(data => data.name === name);
  if (item.length > 0) {
      return item[0].label;
  }
  return name;
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
          this.completionData.push(
            {
              name:'Completion',
              value:this.currentProject.completionPercentage,
              label:(this.currentProject.completionPercentage).toString()+"%"
        }
        );
          this.completionData.push(
            {
              name:'Pending',
              value:100-this.currentProject.completionPercentage,
              label:(100-this.currentProject.completionPercentage).toString()+"%"
            }
            );
          this.testCoveredData.push(
            {
              name:'Testing Covered',
              value:this.currentProject.testingCoverage,
              label:(this.currentProject.testingCoverage).toString()+"%"
            }
            );
          this.testCoveredData.push(
            {
              name:'Testing Pending',
              value:100-this.currentProject.testingCoverage,
              label:(this.currentProject.testingCoverage).toString()+"%"
            }
            );
          this.isProjectAllocated=true; 
          this.viewStatus=true; 
        }else{
          this.isProjectAllocated=false;
          this.viewStatus=false;
        }
      },error=>{
        console.log(error);
      }
    )
  }

  

}
