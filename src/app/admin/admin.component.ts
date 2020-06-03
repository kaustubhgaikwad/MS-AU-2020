import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { StudentAssignmentService } from '../services/student-assignment.service';

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
  constructor(public authService:AuthService,private studentAssignmentService:StudentAssignmentService) { }

  ngOnInit(): void {
    this.admin=this.authService.isAdmin();
    this.getAssignmentRecord();
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
