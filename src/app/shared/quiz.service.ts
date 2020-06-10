import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = "http://localhost:8080/quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  qns: any[];
  qnProgress: number;
  correctAnswerCount: number = 0;

  constructor(private http:HttpClient) { }

  getQuestions(){
    return this.http.get(baseUrl+'/questions');
  }
  getQuestionsById(id){
    return this.http.get(baseUrl+'/questions/'+id);
  }

}
