import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutCategoriesService {

  private baseUrl:string='https://waz3ly.net/dashboard/api/dashboard'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.baseUrl}/expenses`)
  }

  add(data){
    return this.http.post<any>(`${this.baseUrl}/expenses`, data)
  }

  edit(data, id){
    return this.http.post<any>(`${this.baseUrl}/expenses/${id}?_method=PUT`, data)
  }

        // delete
        delete_section(item: any):Observable<any>{
          return this.http.delete<any>(this.baseUrl +`/expenses/${item.id}`)
      }


  //get child
  getChildes(id){
    return this.http.get<any>(`${this.baseUrl}/out_categories/${id}/getChildes`)
  }

}


