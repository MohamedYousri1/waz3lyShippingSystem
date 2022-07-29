import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsService {


  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/ins`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/ins`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/ins/${id}?_method=PUT`, data)
  }

  get_one(id){
    return this.http.get<any>(`${this.baseUrl}/in_categories/${id}/getIns`)
  }

}
