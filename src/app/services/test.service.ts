import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private base_url:string="https://waz3ly.net/dashboard/api/dashboard";

  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<any>(`${this.base_url}/ways`)
  }

  add(data):Observable<any>{
    return this.http.post(`${this.base_url}/ways`, data)
  }

  edit(data, id):Observable<any>{
    return this.http.put(`${this.base_url}/ways/${id}?_method=PUT`, data)
  }
}
