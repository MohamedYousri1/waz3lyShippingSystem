import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {
  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/qualifications`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/qualifications`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/qualifications/${id}?_method=PUT`, data)
  }
}
