import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getStudent(email){
    return this.http.get(baseUrl+'/email/'+email);
  }
  getAll(){
    return this.http.get(baseUrl+'/all');
  }
  getStudentById(id){
    return this.http.get(baseUrl+"/"+id);
  }
  getStudentScore(id){
    return this.http.get(baseUrl+"/score/"+id);
  }
  updateStudentFinalScore(data){
    return this.http.put(baseUrl+"/finalscore",data);
  }
  calculateFinalScore(){
    return this.http.get(baseUrl+"/calculatefinalScore");
  }
}
