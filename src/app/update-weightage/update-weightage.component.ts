import { Component, OnInit } from '@angular/core';
import { UpdateWeightageService } from '../services/update-weightage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-update-weightage',
  templateUrl: './update-weightage.component.html',
  styleUrls: ['./update-weightage.component.css']
})
export class UpdateWeightageComponent implements OnInit {
  
  
  public columnDefs: ColDef[];  
  private api: GridApi;  
  private columnApi: ColumnApi;
  showList=true;
  update =false;
  constructor(
    private studentService:StudentService,
    private  updateService :UpdateWeightageService,private toastr:ToastrService,private router:Router) {
      this.columnDefs = this.createColumnDefs();
     }
  assignmentPercentage=0;
  projectPercentage=0;
  message=""
  value=0;
  weightage:any;
  isloaded=false;
  students:any;
  ngOnInit(): void {
    this.getValues();
    this.getStudents();
  }
  changeUpdateStatus(){
    this.showList= !this.showList;
  }

  createColumnDefs() {
    return [{  
      headerName: 'Student Name',  
      field: 'name',  
      filter: true,  
      enableSorting: true,  
      editable: true,  
      sortable: true,
      cellRenderer: 'boldRenderer',
      getQuickFilterText: function(params) {
                return params.value.name;
            }
  },{  
    headerName: 'Student Email',  
    field: 'emailId',  
    filter: true,  
    enableSorting: true,  
    editable: true,  
    sortable: true  
} ] 
    
  }

  
  onGridReady(params): void {  
    this.api = params.api;  
    this.columnApi = params.columnApi;  
    this.api.sizeColumnsToFit();  
  }
  getStudents(){
    this.studentService.getAll().subscribe(
      data=>{
          this.students=data;
      },error=>{

      }
    )
  }
  getValues(){
    this.updateService.getWeightage().subscribe(
      data=>{
        this.weightage=data[0];
        this.isloaded=true;
        console.log(this.weightage)
      },error=>{

      }
    )
  }
  formatLabel(value: number){
    if(value>=100){
      return Math.round(value/100)+"%";
    }
    return value;
  }
  onAssignmentChange(){
    this.weightage.project=100-this.weightage.assignment;
  }
  onProjectChange(){
    this.weightage.assignment=100-this.weightage.project;
  }
  calculate(){
    if (this.api.getSelectedRows().length == 0) { 
      this.toastr.error("error", "Please select a student");  
      return; 
    }else{
      var row = this.api.getSelectedRows();
      this.router.navigate(['/score-card/'+row[0].id])
    }
  }
  updateWeightage(){
    if(this.weightage.project+this.weightage.assignment!=100){
      this.message="Please make sure the total is 100%";
      return;
    }else{
      this.message="";
    console.log("Assignment="+this.weightage.project);
    console.log("Project="+this.weightage.assignment);
      console.log("update data="+this.weightage);
    this.updateService.update(this.weightage).subscribe(
      data=>{
          this.toastr.info("Change Updated");
          this.showList= !this.showList;
          //this.router.navigate(['/admin']);
      },error=>{

      }
    )
    }
  }


  calulateFinalScore(){
    console.log("Inside calcualte");
      this.studentService.calculateFinalScore().subscribe(
        data=>{
          console.log("data="+data);
          this.toastr.success("Scores of all grads calculated");
        },error=>{
            console.log("error");
        }
      )
  }
  
  
  

}
