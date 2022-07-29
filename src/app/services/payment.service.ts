import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private base_url:string="https://waz3ly.net/dashboard/api/dashboard"
  constructor(private http:HttpClient) { }

  //get all
  getAll(){
    return this.http.get<any>(`${this.base_url}/payment_type`)
  }

  //add
  add(data){
    return this.http.post<any>(`${this.base_url}/payment_type`, data)
  }

  //edit
  edit(data, id){
    return this.http.post<any>(`${this.base_url}/payment_type/${id}?_method=PUT`, data)
  }
     // delete
     delete_section(item: any):Observable<any>{
      return this.http.delete<any>(this.base_url +`/payment_type/${item.id}`)
  }

}
