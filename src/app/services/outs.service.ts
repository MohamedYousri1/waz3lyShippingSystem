import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutsService {


  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/outs`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/outs`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/outs/${id}?_method=PUT`, data)
  }

  get_one(id){
    return this.http.get<any>(`${this.baseUrl}/out_categories/${id}/getouts`)
  }


}
