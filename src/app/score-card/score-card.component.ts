import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { UpdateWeightageService } from '../services/update-weightage.service';
import { StudentAssignmentService } from '../services/student-assignment.service';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel =false;
  xAxisLabel = 'Score';
  showYAxisLabel = true;
  yAxisLabel = 'Score';
  studentId:any;

  constructor(
  public authService:AuthService,
  private toastr:ToastrService,
  private route: ActivatedRoute,
  private router: Router,
  private stundetService:StudentService,
  private  updateService :UpdateWeightageService,
  private studentAssignmentService:StudentAssignmentService,
  private projectService:ProjectService) { }
  currentStudent:any;
  dataLoaded=false;
  marksdata=[]
  paraMetersLoaded=false;
  showGradeAssignment=false;
  assessmentParameters=[]
  scoreCalculated=false;

  calulateFinalScore(){

    console.log("Assignmenrt marks"+this.marksdata[0].value);
    console.log("Project Marks"+this.marksdata[1].value);
    var finalScore = ((this.marksdata[0].value*this.assessmentParameters[0].value)/100) + ((this.marksdata[1].value*this.assessmentParameters[1].value)/100) 
    console.log("final marks = " +finalScore );
    this.currentStudent.score=finalScore;
    this.stundetService.updateStudentFinalScore(this.currentStudent).subscribe(
      data=>{
        this.toastr.success("Final Score Added");
        this.scoreCalculated=true;
      }
    )

  } 


  ngOnInit(): void {
    this.getRecords(this.route.snapshot.paramMap.get('id'));
    this.studentId=this.route.snapshot.paramMap.get('id');
    this.getParameters();
  }
  pieChartLabel(assessmentParameters: any[], name: string): string {
    const item = assessmentParameters.filter(data => data.name === name);
    if (item.length > 0) {
        return item[0].label;
    }
    return name;
  }
  getRecords(id){
    this.stundetService.getStudentScore(id).subscribe(
      data=>{
        this.dataLoaded=true;
        this.currentStudent=data;
        if(this.currentStudent.score == 0){
          this.scoreCalculated=false;
        }else{
          this.scoreCalculated=true;
        }
        
        this.marksdata.push(
          {
            name:"Assignment Marks",
            value:this.currentStudent.assignmentMarks
          },
          {
            name:"Project Marks",
            value:this.currentStudent.projectMarks
          }
        )
        if(this.currentStudent.assignmentMarks == 0 && this.currentStudent.projectMarks){
            this.showGradeAssignment=true;
        }
      },error=>{

      }
    )
  }
  calulateAssignmentScore(){
    // this.projectService.getByStudentId(this.studentId).subscribe(
    //   data=>{
    //     this.currentStudent.projectMarks=data.score;
    //   }
    // )

  }

  getParameters(){
    this.updateService.getWeightage().subscribe(
      data=>{
        this.paraMetersLoaded=true;
        this.assessmentParameters.push(
          {
            name:"Assignment Weightage",
            value:data[0].assignment,
            label:data[0].assignment
          },
          {
            name:"Project Weightage",
            value:data[0].project,
            label:data[0].project
          }
        )
      },error=>{

      }
    )
  }

}
