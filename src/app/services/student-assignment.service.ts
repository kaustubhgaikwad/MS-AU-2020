import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

//const baseUrl = 'http://localhost:8080/studentassignments';
const baseUrl = 'http://localhost:8080/assignmentrecords';
@Injectable({
  providedIn: 'root'
})
export class StudentAssignmentService {

  constructor(private http:HttpClient) { }

  addRecord(data){
    return this.http.post(baseUrl+'/add',data);
  }

  getRecord(title,email){
    return this.http.get(baseUrl+'/'+title+'/'+email);
  }
  updateRecord(id,data){
    return this.http.put(baseUrl+'/'+id,data);
  }
  getRecordByEmail(email){
    return this.http.get(baseUrl+'/all'+'/'+email);
  }
  getAll(){
    return this.http.get(baseUrl+'/all');
  }
  getRecordById(id){
    return this.http.get(baseUrl+'/'+id);
  }
}
