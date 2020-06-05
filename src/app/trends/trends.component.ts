import { Component, OnInit } from '@angular/core';
import { GetstudentdeatilsService } from '../services/getstudentdeatils.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Course';
  xAxisStudent="CandidateName";
  showYAxisLabel = true;
  yAxisLabel = 'No of candidates in course';
  yAxisStudent="Score";
  timeline = true;
  multi = []
  studentDetails:any;
  Details:any;
  autoScale = false;
  angularData=[];
  springData=[];
  isdataloaded=false;
  studentmarksloaded=false;
  studentAssignmentMakrs=[]
  studentProjectMakrs=[]
  studentSCore=[]
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  view: any[] = [700, 400];

  constructor(private getstudentdeatilsService:GetstudentdeatilsService,private studentService:StudentService) { }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.getDetails();
    this.getStudentDeatils();
  }
  getStudentDeatils(){
    this.studentService.getAll().subscribe(
      data=>{
        this.studentDetails=data;
        for(let index in this.studentDetails){
          this.studentAssignmentMakrs.push(
            {
              name:this.studentDetails[index].name,
              value:this.studentDetails[index].assignmentMarks
            }
          )
          this.studentProjectMakrs.push(
            {
              name:this.studentDetails[index].name,
              value:this.studentDetails[index].projectMarks
            }
          )
          this.studentSCore.push(
            {
              name:this.studentDetails[index].name,
              value:this.studentDetails[index].score
            }
          )
        }
        this.studentmarksloaded=true;
      },error=>{

      }
    )

  }
  getDetails(){

    this.getstudentdeatilsService.getdetails().subscribe(
      data=>{
        this.Details=data;
        console.log(this.Details);
        //console.log(this.Details[0].Delhi);

        for(let index in this.Details[0]){
          this.angularData.push(
            {
              name:this.Details[0][index].location,
              value:this.Details[0][index].value
            }
          )
        }
        for(let index in this.Details[1]){
          this.springData.push(
            {
              name:this.Details[1][index].location,
              value:this.Details[1][index].value
            }
          )
        }
        console.log(this.angularData);
        
        
        this.isdataloaded=true;

      },error=>{
        console.log("error");

      }
    )


     
  }

}
