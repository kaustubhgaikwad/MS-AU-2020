import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl="http://localhost:8080/weightage"

@Injectable({
  providedIn: 'root'
})
export class UpdateWeightageService {

  constructor(private http:HttpClient) { }

  getWeightage(){
    return this.http.get(baseUrl+"/get");
  }
  update(data){
    return this.http.put(baseUrl+"/update",data);
  }
}
