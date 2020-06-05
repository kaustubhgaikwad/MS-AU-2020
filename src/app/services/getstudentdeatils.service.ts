import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseURl="http://localhost:8080/studentdetails"

@Injectable({
  providedIn: 'root'
})
export class GetstudentdeatilsService {

  constructor(private http:HttpClient) { }

  getdetails(){
    return this.http.get(baseURl+"/details")
  } 

}
