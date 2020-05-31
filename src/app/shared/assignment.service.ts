import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/assignments';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAll() {
    console.log("Inside Assignmet Service .getAll()");
    let response=this.http.get(baseUrl+'/all');
    console.log("get all response="+response)
    return response;
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {

    return this.http.post(baseUrl+'/add', data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
     
  }

  // deleteAll() {
  //   return this.http.delete(baseUrl);
  // }

  findByTitle(title) {
    console.log("title=");
    let response=this.http.get(baseUrl+'/title/'+title);
    console.log("response="+response);
    return response;
  }


}
