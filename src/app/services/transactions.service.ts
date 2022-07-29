import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private base_url='https://waz3ly.net/dashboard/api/dashboard'
  constructor(private http:HttpClient) { }


  //get all
  getAll(){
    return this.http.get<any>(`${this.base_url}/transactions`)
  }

  //add
  add(data){
    return this.http.post<any>(`${this.base_url}/transactions`, data)
  }

  //edit
  edit(data, id){
    return this.http.post<any>(`${this.base_url}/transactions/${id}?_method=PUT`, data)
  }

}
