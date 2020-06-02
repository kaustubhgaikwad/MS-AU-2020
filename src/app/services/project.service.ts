import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl="http://localhost:8080/project"

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  getByStudentId(id){
    console.log("Id passes to backend ="+id);
    return this.http.get(baseUrl+'/'+id);
  }
  add(data){
    return this.http.post(baseUrl+'/add',data);
  }
  update(data){
    return this.http.put(baseUrl+'/update',data);
  }
}
