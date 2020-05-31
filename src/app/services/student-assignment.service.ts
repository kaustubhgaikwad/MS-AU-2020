import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/assignmentrecords';

@Injectable({
  providedIn: 'root'
})
export class StudentAssignmentService {

  constructor(private http:HttpClient) { }

  addRecord(data){
    return this.http.post(baseUrl+'/add',data);
  }
}
