import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperianceService {
  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/experiences`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/experiences`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/experiences/${id}?_method=PUT`, data)
  }
}
