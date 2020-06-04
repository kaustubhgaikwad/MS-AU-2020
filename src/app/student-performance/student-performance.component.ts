import { Component, OnInit } from '@angular/core';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.css']
})
export class StudentPerformanceComponent implements OnInit {

  assignmentPerformance=[]
  isAssignmenrloaded=false;
  projectPerformance=[]
  isProjectLoaded=false;
  assignmentRecord:any;
  projectRecords:any;

  view: any[] = [600, 400];
  // options for the chart
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Assignment';
  showYAxisLabel = true;
  yAxisLabel = 'Score';
  //timeline = true;
  single = [
    {
      "name": "China",
      "value": 2
    },
    {
      "name": "USA",
      "value": 4
    },
    {
      "name": "Norway",
      "value": 5
    }
  ];
  

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;

  constructor(private projectService:ProjectService,private route: ActivatedRoute,private router: Router,private studentAssignmentService:StudentAssignmentService) { }

  ngOnInit(): void {
    this.getAssignmentPerformance();
    this.getProjectPerformance();

  }
 

  getAssignmentPerformance(){
    this.studentAssignmentService.getRecordByStudentId(this.route.snapshot.paramMap.get('id')).subscribe(
      data=>{
          this.assignmentRecord=data;
          for(let record of this.assignmentRecord){
            this.assignmentPerformance.push(
              {
                name:record.assignmentTitle,
                value:record.score
              }
            );
          }
          this.isAssignmenrloaded=true;

          console.log(this.assignmentPerformance);
          console.log(this.single);
          
      },error=>{

      }
    )
    //this.studentAssignmentService.getRecordByEmail().subscribe(

    

  }
  getProjectPerformance(){
    this.projectService.getByStudentId(this.route.snapshot.paramMap.get('id')).subscribe(
      data=>{
        console.log("project data loaded")
          this.projectRecords= data;
          
            this.projectPerformance.push(
              {
                "name":"BuildMarks",
                "value":this.projectRecords.buildMarks
              },
              {
                "name":"TestingMarks",
                "value":this.projectRecords.testingMarks
              },
              {
                "name":"ProcessMarks",
                "value":this.projectRecords.processMarks
              }
            )
            this.isProjectLoaded=true;
          
      },error=>{

      }
    )

  }

}
