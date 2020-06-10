import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  isLoaded=false;
  showResult=false;
  submitted=false;
  

  constructor(public quizService:QuizService,private router:Router,public fb: FormBuilder,private toastr:ToastrService) { }
  alphabet =['A','B','C','D'];

  oppoSuits: any = ['Java','C++'];

  oppoSuitsForm = this.fb.group({
    name: ['']
  })


  onSubmit() {
    this.submitted=true;
    let id = this.oppoSuits.indexOf(this.oppoSuitsForm.value.name)
    if(id<0){
      this.toastr.error("Please Select a valid subject for quiz");
      return ;
    }
    console.log("Quiz id = "+this.oppoSuits.indexOf(this.oppoSuitsForm.value.name)+1 );
    this.getQuestionsById(this.oppoSuits.indexOf(this.oppoSuitsForm.value.name)+1);
  }


  ngOnInit(): void {
    //this.getQuestions();
    this.isLoaded=false;
    this.showResult=false;
    this.quizService.qnProgress=0;
    this.quizService.correctAnswerCount=0;
  }
  
  // getQuestions(){
  //   this.quizService.qnProgress = 0;
  //   this.quizService.getQuestions().subscribe(
  //     (data:any)=>{
  //       this.quizService.qns=data;
  //       this.isLoaded=true;
  //       console.log("Quiz data="+this.quizService.qns)
  //     }
  //   )
  // }

  getQuestionsById(id){
    this.quizService.qnProgress = 0;
    this.quizService.getQuestionsById(id).subscribe(
      (data:any)=>{
        this.quizService.qns=data;
        this.isLoaded=true;
        console.log("Quiz data="+this.quizService.qns)
      }
    )
  }

  Answer(qID, choice) {
    this.quizService.qns[this.quizService.qnProgress].choice = choice+1;
    
    this.quizService.qnProgress++;
    console.log("QUestion answered");
    
    if (this.quizService.qnProgress == this.quizService.qns.length) {
      this.quizService.qns.forEach((e, i) => {
        if (e.ans == e.choice){
          console.log(e);
          this.quizService.correctAnswerCount++;
        }
      });
      this.showResult=true;
      //this.router.navigate(['/student/quiz/result']);
    }
  }
  submit(){
    console.log("submit")
    this.quizService.qns.forEach((e, i) => {
      if (e.ans == e.choice){
        console.log(e);
        this.quizService.correctAnswerCount++;
      }
    });
    this.showResult=true;

  }

}
