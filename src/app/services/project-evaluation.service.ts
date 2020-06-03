import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl="http://localhost:8080/projectevaluation"

@Injectable({
  providedIn: 'root'
})
export class ProjectEvaluationService {

  constructor(private http:HttpClient) { }

  update(data){
    this.http.put(baseUrl+"/update",data);
  }

  get(){
    return this.http.get(baseUrl+"/get");
  }
}
