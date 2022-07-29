import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialTransactService {

  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/financialTransaction`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/financialTransaction`, data)
  }

  // edit(data, id){
  //   return this.http.post<any>(`${this.baseUrl}/financialTransaction/${id}?_method=PUT`, data)
  // }
        // delete
      //   delete_section(item: any):Observable<any>{
      //     return this.http.delete<any>(this.baseUrl +`/financialTransaction/${item.id}`)
      // }


      // expenses
      getRevenues(){
        return this.http.get<any>(`${this.baseUrl}/revenues`)
      }

      getExpenses(){
        return this.http.get<any>(`${this.baseUrl}/expenses`)
      }

}
