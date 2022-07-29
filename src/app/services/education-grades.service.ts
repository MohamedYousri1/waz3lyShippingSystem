import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationGradesService {
  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/education_grades`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/education_grades`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/education_grades/${id}?_method=PUT`, data)
  }
}
