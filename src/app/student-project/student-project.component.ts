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
  showStatus:boolean;
  value=0;
  testValue=0;
  completionData=[]
  testCoveredData=[]
  isEvaluated:boolean;
  // completionStatus=[
  //   {
  //     "name": "Completion",
  //     "value": this.value,
  //     "label": "35iuguig"
  //   },
  //   {
  //     "name": "Pending asdgaso;dg;asdgas",
  //     "value": 100-this.value,
  //     "label": "kkkkk"
  //   }
  // ]
  // testCoverage=[
  //   {
  //     "name": "Testing Covered",
  //     "value": this.testValue,
  //     "label": this.testValue.toString()+"%"
  //   },
  //   {
  //     "name": "Testing Uncovered",
  //     "value": 100-this.testValue,
  //     "label": (100-this.testValue).toString()+"%"
  //   }
  // ]
  changeShowStatus(){

    console.log("Status Changed");
    this.showStatus=!this.showStatus;
  }
  
  // series = [
  //   {
  //     "name": "Completion",
  //     "value": 30,
  //     "label": "30%"
  //   },
  //   {
  //     "name": "Pending",
  //     "value": 70,
  //     "label": "70%"
  //   }
  // ];
  
  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.showStatus=true;
    this.getProjectDetails();
    
  }
  onGridReady(params): void {  
    this.api = params.api;  
    this.columnApi = params.columnApi;  
    this.api.sizeColumnsToFit();  
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
getProjectDetails(){
  console.log("ID="+localStorage.getItem('studentId'));
    this.projectService.getByStudentId(localStorage.getItem('studentId')).subscribe(
      data=>{
        if(data!=null){
          console.log("Inside get Project Details");
          this.currentProject=data;
          if(this.currentProject.score > 0 ){
            this.isEvaluated=true;
          }else{
            this.isEvaluated=false;
          }
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
          this.value=this.currentProject.completionPercentage;
          this.testValue=this.currentProject.testingCoverage;
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
  console.log("Compltion=",this.currentProject.completionPercentage);

  this.projectService.update(this.currentProject).subscribe(
    data=>{
      this.value=this.currentProject.completionPercentage;
      this.testValue=this.currentProject.testCoverage;
      console.log("Test Value"+this.currentProject.testingCoverage);
      console.log("Cover"+this.value);
      console.log("Project Details Updated");

      console.log("Data="+data);
      
      this.completionData[0].value=this.currentProject.completionPercentage;
      this.completionData[0].label=(this.currentProject.completionPercentage).toString()+"%";
      
      this.completionData[1].value=100-this.currentProject.completionPercentage;
      this.completionData[1].label=(100-this.currentProject.completionPercentage).toString()+"%";
      
      this.testCoveredData[0].value=this.currentProject.testingCoverage;
      this.testCoveredData[0].label=(this.currentProject.testingCoverage).toString()+"%";

      this.testCoveredData[1].value=100-this.currentProject.testingCoverage;
      this.testCoveredData[1].label=(100-this.currentProject.testingCoverage).toString()+"%";
      
      this.changeShowStatus();
    },error=>{

    }
  )
}

}
