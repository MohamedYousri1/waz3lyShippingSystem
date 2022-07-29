import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductStatusesService {
  private base_url='https://waz3ly.net/dashboard/api/dashboard'
  constructor(private http:HttpClient) { }


  //get all
  getAll(){
    return this.http.get<any>(`${this.base_url}/product_statuses`)
  }

  //add
  add(data){
    return this.http.post<any>(`${this.base_url}/product_statuses`, data)
  }

  //edit
  edit(data, id){
    return this.http.post<any>(`${this.base_url}/product_statuses/${id}?_method=PUT`, data)
  }
}
