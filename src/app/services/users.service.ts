import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private base_url:string="https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }

  //get all
  getAll():Observable<any>{
    return this.http.get<any>(`${this.base_url}/users`)
  }

  //post
  add(data):Observable<any>{
    return this.http.post<any>(`${this.base_url}/users`, data)
  }

  //edit
  edit(data,id):Observable<any>{
    return this.http.post<any>(`${this.base_url}/users/${id}?_method=PUT`, data)
  }
  getBacks():Observable<any>
  {
    return this.http.get(`${this.base_url}/statistics/getBackShipments`)
  }
}
